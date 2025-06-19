import { getMyStartupsFn } from "@/data-access/startups.server";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useMyStartups() {
    return useSuspenseQuery({
        queryKey: ["my-startups"],
        queryFn: getMyStartupsFn
    });
}