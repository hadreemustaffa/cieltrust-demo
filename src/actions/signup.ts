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
    console.log(error);
  }
}
