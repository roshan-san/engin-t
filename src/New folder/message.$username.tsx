import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/message/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    yele yale 
    </div>
}
