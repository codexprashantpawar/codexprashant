import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Simply browse our collection, select the items you love, choose your size and color, add them to your bag, and proceed to checkout. You can pay using Cash on Delivery, UPI, or Credit/Debit cards."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery (COD), UPI payments (PhonePe, Google Pay, Paytm), and all major Credit/Debit cards (Visa, Mastercard, RuPay, American Express)."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days for metro cities and 7-10 business days for other locations. Express shipping (2-3 business days) is available for select pin codes at an additional charge."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 15-day easy return policy. Items must be unused, unwashed, and in original packaging with tags attached. Initiate a return through your account or contact our customer service."
  },
  {
    question: "How do I find my size?",
    answer: "Check our Size Guide for detailed measurements. If you're between sizes, we recommend going up for a comfortable fit. Our customer service team can also help you with sizing queries."
  },
  {
    question: "Do you offer alterations?",
    answer: "Yes, we offer basic alterations for certain products like saree blouses and kurtis. Alteration requests should be made at the time of ordering. Additional charges may apply."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking link via SMS and email. You can also track your order by logging into your account and visiting 'My Orders'."
  },
  {
    question: "What if I receive a damaged product?",
    answer: "We're sorry if that happens! Please contact us within 48 hours of delivery with photos of the damage. We'll arrange a replacement or refund at no additional cost."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India. We're working on expanding our shipping to other countries. Subscribe to our newsletter to be notified when international shipping becomes available."
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach us via phone at +91 8830764356 or +91 7499452407, email us at aaryan100m@gmail.com, or use the contact form on our website. Our team is available Monday to Saturday, 10 AM to 7 PM IST."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-center mb-12">
              Find answers to common questions about shopping with VYSTRA
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 p-8 bg-secondary rounded-lg text-center">
              <h2 className="font-serif text-2xl mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our customer service team is here to help you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:8830764356" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Call Us
                </a>
                <a href="mailto:aaryan100m@gmail.com" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
