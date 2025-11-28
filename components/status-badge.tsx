import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const lower = status?.toLowerCase() || ""
    if (lower.includes("pending") || lower.includes("review")) {
      return "bg-warning/20 text-warning-foreground hover:bg-warning/30 border-warning/30"
    }
    if (lower.includes("approved") || lower.includes("active") || lower.includes("delivered") || lower.includes("closed")) {
      return "bg-success/20 text-success-foreground hover:bg-success/30 border-success/30"
    }
    if (lower.includes("rejected") || lower.includes("overdue") || lower.includes("critical") || lower.includes("high")) {
      return "bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/30"
    }
    if (lower.includes("medium") || lower.includes("evaluation") || lower.includes("open")) {
      return "bg-info/20 text-info-foreground hover:bg-info/30 border-info/30"
    }
    return "bg-muted text-muted-foreground hover:bg-muted/80"
  }

  return (
    <Badge variant={variant || "secondary"} className={cn("font-normal", getStatusColor(status))}>
      {status}
    </Badge>
  )
}
