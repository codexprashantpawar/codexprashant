import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastCheckedUserId, setLastCheckedUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        setLastCheckedUserId(null);
        return;
      }

      // Mark as loading for this user until the role check completes
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (err) {
        console.error('Error:', err);
        setIsAdmin(false);
      }
      setLastCheckedUserId(user.id);
      setLoading(false);
    };

    // If we have a user that we haven't checked yet, treat as loading
    if (user && user.id !== lastCheckedUserId) {
      setLoading(true);
      checkAdminRole();
    }
  }, [user, lastCheckedUserId]);

  // While a new user is present but not yet checked, keep loading true
  const effectiveLoading = loading || (!!user && user.id !== lastCheckedUserId);

  return { isAdmin, loading: effectiveLoading };
};
