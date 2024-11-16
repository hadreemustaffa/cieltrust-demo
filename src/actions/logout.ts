import supabase from "../utils/supabase";

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: true };
  }
}
