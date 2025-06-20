import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { signOut } from '@/lib/auth/auth-client'

export default function SignOutButton() {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={() => {
        signOut()
        navigate({ to: "/" })
      }}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
}
