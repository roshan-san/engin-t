import CreateBtn from '@/features/platform/create-startup/CreateBtn'
import Header from '@/features/platform/Header'
import StartupCard from '@/features/platform/search-startups/StartupCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-6 space-y-4">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-3 bg-muted rounded w-1/3" />
      </div>
    </div>
  )
}

export default function RouteComponent() {
  const myStartups = {
    isLoading: false,
    data: [
      {
        id: '1',
        name: 'Mock Startup 1',
        description: 'This is a mock startup for testing',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Mock Startup 2',
        description: 'Another mock startup for testing',
        createdAt: new Date().toISOString(),
      }
    ]
  }
  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Dashboard</Header>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {myStartups.isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : myStartups.data?.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground py-8">
              You haven't created any startups yet
            </div>
          ) : (
            myStartups.data?.map((startup) => (
              <StartupCard key={startup.id} startup={{
                id: startup.id,
                name: startup.name,
                description: startup.description,
                location: null,
                problem: '',
                solution: '',
                team_size: null,
                patent: '',
                funding: 0,
                created_at: new Date(startup.createdAt),
                founderId: ''
              }} />
            ))
          )}
        </div>
        <CreateBtn />
      </div>
    </div>
  )
}
