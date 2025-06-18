import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"
import { FcGoogle } from "react-icons/fc"
export function GoogleButton() {  
    return (
        <Button 
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            onClick={()=>signIn.social({provider:"google"})}
       >
        <FcGoogle className="h-5 w-5" />
            <span className="text-base">
                Sign in with Google
            </span>
        </Button>
    )
}