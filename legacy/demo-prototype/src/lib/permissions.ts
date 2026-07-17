import type { Role } from "@/lib/types";

const permissions: Record<Role, string[]> = {
  citizen: ["own:profile", "own:conversations", "own:tickets", "own:appointments", "own:referrals"],
  support_agent: ["assigned:tickets", "limited:conversation_context"],
  content_editor: ["documents:draft", "documents:submit_review"],
  clinical_reviewer: ["documents:approve", "documents:reject", "response_reviews:read"],
  administrator: ["system:configure", "users:manage", "analytics:read", "documents:publish"],
  auditor: ["audit_logs:read", "review_history:read"],
};

export function can(role: Role, permission: string) {
  return permissions[role].includes(permission);
}

