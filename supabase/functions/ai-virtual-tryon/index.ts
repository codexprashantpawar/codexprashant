import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userImage, productImage, productName } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Use Gemini to analyze and provide styling suggestions
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          {
            role: 'system',
            content: `You are a fashion styling AI assistant. When given a product name and description, provide a brief, helpful response about how the item would look and styling tips. Keep responses under 100 words and make them encouraging and helpful.`
          },
          {
            role: 'user',
            content: `A customer wants to virtually try on "${productName}". Please provide a brief styling tip and description of how this product would complement their look. Be encouraging and helpful.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Service is busy, please try again in a moment.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content || 
      `${productName} would look amazing on you! This piece is versatile and can be styled for both casual and formal occasions.`;

    return new Response(JSON.stringify({ 
      success: true,
      description,
      message: 'Virtual try-on analysis complete'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Virtual try-on error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      description: 'This product would complement your style beautifully. Try it on to see for yourself!'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});