import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { HiBell } from "react-icons/hi"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReqDrawer() {
  const pendingConnections = {
    data: [
      { id: "ddkjhd", sender_id: "user1" },
      { id: "dkjhjd", sender_id: "user2" },
      { id: "dljdkdj", sender_id: "user3" }
    ],
    isLoading: false,
    error: null
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="lg" className="relative h-14 px-4">
          <HiBell className="h-6 w-6" />
          {pendingConnections.data && pendingConnections.data.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
              {pendingConnections.data.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Connection Requests</DrawerTitle>
          <DrawerDescription>
            View and manage your pending connection requests
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {pendingConnections.isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : pendingConnections.error ? (
            <div className="text-center text-red-500">
              Error loading connection requests
            </div>
          ) : pendingConnections.data?.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No pending connection requests
            </div>
          ) : (
            <div className="space-y-4">
              {pendingConnections.data?.map((connection) => {
                console.log(pendingConnections.data)
                return (
                <div key={connection.id}>
                  {connection.sender_id}
                </div>
              )})}
            </div>
          )}
        </div>   
      </DrawerContent>
    </Drawer>
  )
} 