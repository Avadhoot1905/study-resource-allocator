import { useQuery } from "@tanstack/react-query";
import { Quiz } from "@prisma/client";

export function useQuizzes(userId: string) {
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", userId],
    queryFn: async () => {
      const res = await fetch(`/api/quiz?userId=${userId}`);
      return res.json();
    },
    enabled: !!userId,
  });
}