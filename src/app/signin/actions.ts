'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(email: string) {
  // redirect(`/dashboard`);
  redirect(`/confirm-email?email=${email}`);
}