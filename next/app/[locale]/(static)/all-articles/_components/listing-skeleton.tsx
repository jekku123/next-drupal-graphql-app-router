import { Skeleton } from "@/ui/skeleton";

export function ListingSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-32 mt-4" />
      <Skeleton className="w-full h-32 mt-4" />{" "}
      <Skeleton className="w-full h-32 mt-4" />{" "}
    </>
  );
}
