import { useQuery } from "@tanstack/react-query";
import { Roadmap } from "@prisma/client";

export function useRoadmaps(userId: string) {
  return useQuery<Roadmap[]>({
    queryKey: ["roadmaps", userId],
    queryFn: async () => {
      const res = await fetch(`/api/roadmap?userId=${userId}`);
      return res.json();
    },
    enabled: !!userId,
  });
}