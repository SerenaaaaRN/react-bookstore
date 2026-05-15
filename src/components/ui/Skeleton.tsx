import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

const Skeleton = ({ className, ...props }: ComponentProps<"div">
) => {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-300 dark:bg-gray-700", className)}
            {...props} />
    )
}

export { Skeleton };