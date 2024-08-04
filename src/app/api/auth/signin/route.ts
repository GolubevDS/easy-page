import { createClient } from "@/shared/lib/supabase/server";
import { reportError } from "@/shared/lib/utils";
import { revalidatePath } from "next/cache";

/**
 * Handles the POST request for user sign-up.
 * 
 * @param request - The request object containing the form data.
 * @returns A JSON response containing the user's email if sign-up is successful.
 * @throws An error if there is an issue with sign-up or form data.
 */
export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData()

  const credentials = {
    email: formData.get('email') as string,
    options: {
      emailRedirectTo: '/confirm-email',
    }
  }

  try {
    const { error } = await supabase.auth.signInWithOtp(credentials);

    if (error ) {
      throw new Error(error.message);
    }

    revalidatePath('/dashboard', 'layout');
    return Response.json({ email: credentials.email });
  } catch (error) {
    throw new Error(reportError(error));
  }
}