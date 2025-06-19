import { getMyStartupsFn } from "@/data-access/startups.server";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useMyStartups(userId: string) {
    return useSuspenseQuery({
        queryKey: ["my-startups", userId],
        queryFn: getMyStartupsFn
    });
}