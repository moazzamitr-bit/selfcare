import { Badge } from "@/components/ui/badge";

export function PageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      {badge ? (
        <Badge variant="secondary" className="w-fit rounded-xl">
          {badge}
        </Badge>
      ) : null}
      <h1 className="text-2xl font-bold tracking-normal text-foreground md:text-3xl">{title}</h1>
      {description ? <p className="max-w-3xl text-[15px] leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}

