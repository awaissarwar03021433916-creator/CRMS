import clsx from "clsx";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return <div className={clsx("animate-pulse rounded bg-gray-200", className)} />;
}

export function SkeletonRow() {
  return <Skeleton className="h-6 w-full" />;
}
