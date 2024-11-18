import supabase from "../utils/supabase";

// source: https://github.com/orgs/supabase/discussions/250#discussioncomment-5361165
export async function deleteUser() {
  const { error } = await supabase.rpc("delete_user");

  if (error) {
    console.log(error);
  }
}
