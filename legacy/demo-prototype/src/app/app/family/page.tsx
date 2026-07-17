import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { familyMembers } from "@/lib/demo-data";

export default function FamilyPage() {
  return (
    <div>
      <PageHeader title="اعضای خانواده" description="اطلاعات نمایشی است و سوابق سلامت واقعی جمع‌آوری نمی‌شود." />
      <div className="grid gap-3 md:grid-cols-2">
        {familyMembers.map((member) => (
          <Card key={`${member.relationship}-${member.first_name}`} className="rounded-2xl">
            <CardHeader><CardTitle>{member.first_name} {member.last_name}</CardTitle></CardHeader>
            <CardContent className="text-sm leading-7 text-muted-foreground">
              نسبت: {member.relationship}<br />
              سال تولد: {member.birth_year}<br />
              پزشک و مرکز سلامت: placeholder نمایشی
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

