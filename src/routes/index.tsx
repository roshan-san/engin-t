import { createFileRoute, useRouter } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className='flex items-center justify-center border-amber-300 border-2'>
      <h1 className='text-4xl text-center border-blue-800 border-4'>
        Hello roshan 
      </h1>
    </div>
  )
}