import { createClient } from '@/shared/lib/supabase/client';
import { notFound } from 'next/navigation';

export async function generateStaticParams(props) {
  console.log('id', props);
  // const supabase = createClient();
  // const { data, error } = await supabase
  //   .from('websites')
  //   .select('*')
  //   .eq('id', params.id)
  //   .single();

  // if (error) {
  //   throw error;
  // }

  // return data;
  return [];
}

export default function Page(props) {
  console.log('Website data:', props);
  return <></>;
}
