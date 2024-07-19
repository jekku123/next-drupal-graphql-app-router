import { Skeleton } from "@/ui/skeleton";

export function ListingSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-48 mt-4 bg-white" />
      <Skeleton className="w-full h-48 mt-4 bg-white" />
      <Skeleton className="w-full h-48 mt-4 bg-white" />
      <Skeleton className="w-full h-48 mt-4 bg-white" />
    </>
  );
}
