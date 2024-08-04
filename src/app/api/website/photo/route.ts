import { createClient } from "@/shared/lib/supabase/server";
import { reportError } from "@/shared/lib/utils";

export async function POST(request: Request) {
  const supabase = createClient();
  try {
  const filePath = `${userId}.${file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)}`;

  let { error } = await supabase.storage.from('avatars').remove([filePath]);
  console.log('error', error);
  error = (await supabase.storage.from('avatars').upload(filePath, file)).error;

  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

  return data.publicUrl;

    return Response.json(website || {});
  } catch (error) {
    throw new Error(reportError(error));
  }
}