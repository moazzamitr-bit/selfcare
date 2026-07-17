import { AlertTriangle, FileSearch, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <FileSearch className="mx-auto mb-3 text-muted-foreground" aria-hidden />
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

export function ErrorState({ title, description, onRetry }: { title: string; description: string; onRetry?: () => void }) {
  return (
    <Alert variant="destructive" className="rounded-2xl">
      <AlertTriangle aria-hidden />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        {description}
        {onRetry ? (
          <Button variant="outline" className="w-fit" onClick={onRetry}>
            تلاش دوباره
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

export function LoadingState({ label = "در حال بارگذاری..." }: { label?: string }) {
  return (
    <div className="flex min-h-28 items-center justify-center gap-2 rounded-2xl border bg-card text-sm text-muted-foreground">
      <Loader2 className="animate-spin" aria-hidden />
      {label}
    </div>
  );
}

