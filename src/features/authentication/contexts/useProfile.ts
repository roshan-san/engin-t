import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { getProfileById } from '@/data-access/profile'

export function useProfile() {
  const { data: user } = useAuth()
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User ID is required')
      return getProfileById(user.id)
    },
    enabled: !!user?.id,
    staleTime: Infinity,
    gcTime: Infinity,
  })
}
