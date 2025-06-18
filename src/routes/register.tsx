import { createFileRoute } from '@tanstack/react-router'
import { FullScreenLoader } from '@/components/FullScreenLoader'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      regisrer
    </div>
  )
}
