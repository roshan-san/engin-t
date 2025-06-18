import { createFileRoute, Navigate, useLoaderData } from '@tanstack/react-router'
import { OnboardingProvider } from '@/features/onboarding/context/OnboardContext'
import {OnboardingSteps} from '@/features/onboarding/OnboardingSteps'
import { FullScreenLoader } from '@/components/FullScreenLoader'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  loader(ctx) {
     
  },
})

function RouteComponent() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <OnboardingProvider>
        <OnboardingSteps/>
      </OnboardingProvider>
    </div>
  )
}

