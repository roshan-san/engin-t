import { Outlet } from "@tanstack/react-router";
import { useMe } from "@/features/authentication/contexts/AuthContext";

export default function MessagingUi() {
    const {profile} =useMe()
  return (
    <>
      <div className="hidden sm:block">
        <Outlet/>
      </div>
    </>
  )
}
