import { redirect } from "react-router";
import supabase from "../utils/supabase";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function signup(data: FormData) {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    },
  });

  if (error) {
    return { error: true };
  }

  redirect("/dashboard/");
}
