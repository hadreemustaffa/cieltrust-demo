import supabase from "../utils/supabase";

interface FormData {
  email: string;
  password: string;
}

export async function login(data: FormData) {
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error.message);
    return { error };
  }
}

export async function loginAnonymously() {
  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    console.log(error.message);
    return { error };
  }
}
