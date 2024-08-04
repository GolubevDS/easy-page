import { createClient } from '@/shared/lib/supabase/client';
import { Database } from '@/shared/lib/supabase/database.types';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { selectUpdateData, useWebsiteStore } from '../store/useWebsiteStore';
import { redirect } from 'next/navigation';

export function useWebsiteSubscription() {
  const [userId, setUserId] = useState<string | null>(null);
  const updateData = useWebsiteStore(selectUpdateData);

  useEffect(() => {
    const fetchUserAndSubscribe = async () => {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.getUser();

      if (authError || !data?.user) {
        await redirect('/signin');
      }

      setUserId(data.user.id);
    };

    fetchUserAndSubscribe();
  }, []);

  useEffect(() => {
    let channel: RealtimeChannel;

    if (userId) {
      const supabase = createClient();
      channel = supabase
        .channel('update-website-demo')
        .on<Database['public']['Tables']['websites']['Row']>(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'websites',
            filter: 'id=eq.' + userId,
          },
          (payload) => {
            updateData(payload.new);
          }
        )
        .subscribe();
    }

    return () => {
      channel?.unsubscribe();
    };
  }, [userId, updateData]);
}
