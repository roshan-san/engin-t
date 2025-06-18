import { supabase } from "@/lib/supabase"

export async function signOutApi() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getUserApi() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function signInApi(provider: 'github' | 'google') {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.VITE_APP_URL}/dashboard`
    }
  })
  if (error) throw error
}
