import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router'
import CreateBtn from '@/features/platform/create-startup/CreateBtn'
import Header from '@/features/platform/Header'
import StartupCard from '@/features/platform/search-startups/StartupCard'
import { useMyStartups } from '@/features/platform/queries/startup.queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent

  
})

export default function RouteComponent() {
  const myStartups = useMyStartups()

  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <div className="space-y-6">
        <Suspense fallback={
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full col-span-1" />
          ))
        }>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {myStartups.data.length === 0 ? (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                You haven't created any startups yet
              </div>
            ) : (
              myStartups.data.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))
            )}
          </div>
        </Suspense>
        <CreateBtn />
      </div>
    </div>
  )
}