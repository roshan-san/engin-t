import { getMyProfileFn } from "@/data-access/profile.server";
import { useQuery } from "@tanstack/react-query";

export function useMyProfile() {
    return useQuery({
        queryKey: ["my-profile"],
        queryFn: getMyProfileFn,
    })
}