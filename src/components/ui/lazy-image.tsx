import type { ImgHTMLAttributes } from "react";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Above-the-fold hero images should stay eager for LCP. */
  priority?: boolean;
};

export function LazyImage({
  priority = false,
  loading,
  decoding,
  fetchPriority,
  ...props
}: LazyImageProps) {
  return (
    <img
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
      {...props}
    />
  );
}
