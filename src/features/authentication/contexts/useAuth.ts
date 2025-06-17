import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { signInApi, signOutApi, getUserApi } from '@/api/auth'
export function useAuth() {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: getUserApi,
    staleTime: Infinity,
    gcTime:Infinity
    
  })
}

export function signInMutation(provider: 'github' | 'google') {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["signIn"],
    mutationFn: () => signInApi(provider),
    onSuccess: () => {
      queryClient.clear()
    },
    onError: (error) => {
      console.error('Sign in failed:', error)
    }
  })
}

export function signOutMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.clear()
    },
    onError: (error) => {
      console.error('Sign out failed:', error)
    }
  })
}

