import type { ReactNode } from "react";
import { Skeleton, Typography } from "@mui/material";

interface ChartAsyncContentProps<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  skeletonHeight: number;
  children: (data: T) => ReactNode;
}

const ChartAsyncContent = <T,>({
  loading,
  error,
  data,
  skeletonHeight,
  children,
}: ChartAsyncContentProps<T>) => {
  if (loading) {
    return <Skeleton variant="rounded" height={skeletonHeight} sx={{ borderRadius: "8px" }} />;
  }

  if (error || !data) {
    return <Typography sx={{ fontSize: 13, color: "#d03b3b" }}>{error}</Typography>;
  }

  return <>{children(data)}</>;
};

export default ChartAsyncContent;
