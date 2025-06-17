import Hero from '@/features/landing/Hero'
import { createFileRoute, redirect } from '@tanstack/react-router'
import Header from '@/features/landing/Header'
import { getUserApi } from '@/api/auth'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getUserApi()
    if (user) {
      throw redirect({
        to: '/dashboard'
      })
    }
  }
})

function RouteComponent() {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
      </div>
  )
}
