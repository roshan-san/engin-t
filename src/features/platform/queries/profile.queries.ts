import { getMyProfileByIdFn } from "@/data-access/profile.server";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useMyProfile(){
    return useSuspenseQuery({
        queryKey:["my-profile"],
        queryFn:(userId)=>getMyProfileByIdFn()
    })
}