import { createFileRoute } from '@tanstack/react-router'
import ViewProfile from '@/features/platform/view-profile/ViewProfile'

export const Route = createFileRoute('/_protected/profile/$username')({
  component: ProfilePage
})
function ProfilePage() {
  
  return (
    <div>
      hihi
    </div>
  )
}
