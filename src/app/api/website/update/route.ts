import { createClient } from "@/shared/lib/supabase/server";
import { reportError } from "@/shared/lib/utils";

export async function PUT(request: Request) {
  const supabase = createClient();
  try {
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    const { title } = await request.json();
    const { data: website, error } = await supabase
      .from('websites')
      .update({ title })
      .eq('id', data.user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json(website || {});
  } catch (error) {
    throw new Error(reportError(error));
  }
}