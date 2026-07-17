create extension if not exists "uuid-ossp";
create extension if not exists vector;

create type app_role as enum ('citizen','support_agent','content_editor','clinical_reviewer','administrator','auditor');
create type document_status as enum ('draft','pending_review','approved','rejected','archived','expired');
create type ticket_status as enum ('new','assigned','in_progress','waiting_for_user','resolved','closed');
create type ticket_priority as enum ('low','normal','high','urgent');

create table public.users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique,
  role app_role not null default 'citizen',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  mobile text not null,
  national_identifier_placeholder text,
  province text,
  county text,
  preferred_language text default 'fa',
  accessibility_preference jsonb not null default '{}',
  notification_preference jsonb not null default '{}',
  consent_status jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.user_consents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  service_consent boolean not null default false,
  marketing_consent boolean not null default false,
  model_training_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.family_members (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  relationship text not null,
  first_name text not null,
  last_name text not null,
  birth_year int,
  gender text,
  assigned_physician_placeholder text,
  assigned_health_center_placeholder text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.physicians (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  medical_system_number_placeholder text,
  county text,
  service_hours text,
  phone text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.health_centers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  province text,
  county text,
  phone text,
  address text,
  service_hours text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.physician_assignments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  physician_id uuid references public.physicians(id) on delete set null,
  health_center_id uuid references public.health_centers(id) on delete set null,
  source text not null default 'demo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  family_member_id uuid references public.family_members(id) on delete set null,
  physician_id uuid references public.physicians(id) on delete set null,
  health_center_id uuid references public.health_centers(id) on delete set null,
  date date not null,
  time time not null,
  status text not null,
  appointment_type text not null,
  instructions text,
  source text not null default 'demo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.referrals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  referral_code text not null unique,
  specialty text not null,
  referring_physician text,
  destination_center text,
  current_status text not null,
  timeline jsonb not null default '[]',
  next_action text,
  source text not null default 'demo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.reminders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content_redacted text not null,
  safety_level text,
  confidence text,
  created_at timestamptz not null default now()
);

create table public.message_citations (
  id uuid primary key default uuid_generate_v4(),
  message_id uuid not null references public.messages(id) on delete cascade,
  document_id uuid not null,
  title text not null,
  section text,
  version text,
  updated_at date,
  created_at timestamptz not null default now()
);

create table public.message_feedback (
  id uuid primary key default uuid_generate_v4(),
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  feedback_type text not null,
  created_at timestamptz not null default now()
);

create table public.knowledge_documents (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  issuing_organization text,
  source_type text not null,
  source_url text,
  document_version text not null,
  publication_date date,
  effective_date date,
  expiration_date date,
  jurisdiction text,
  province text,
  county text,
  audience text,
  category text,
  approval_status document_status not null default 'draft',
  reviewer uuid references public.users(id) on delete set null,
  approved_at timestamptz,
  supersedes_document_id uuid references public.knowledge_documents(id) on delete set null,
  is_active boolean not null default false,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.knowledge_document_versions (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  version text not null,
  metadata jsonb not null default '{}',
  extracted_text text,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.knowledge_chunks (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  section_title text,
  content text not null,
  metadata jsonb not null default '{}',
  token_count int,
  embedding_model text not null default 'mock',
  embedding_dimensions int not null default 1536,
  embedding vector(1536),
  search_vector tsvector generated always as (to_tsvector('simple', coalesce(section_title,'') || ' ' || content)) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.document_reviews (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  reviewer_id uuid references public.users(id) on delete set null,
  status document_status not null,
  note text,
  created_at timestamptz not null default now()
);

create table public.escalation_tickets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  reason text not null,
  description text,
  priority ticket_priority not null default 'normal',
  status ticket_status not null default 'new',
  assigned_agent_id uuid references public.users(id) on delete set null,
  county text,
  health_center_id uuid references public.health_centers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolution_note text,
  deleted_at timestamptz
);

create table public.ticket_messages (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid not null references public.escalation_tickets(id) on delete cascade,
  author_id uuid references public.users(id) on delete set null,
  body text not null,
  internal_only boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.support_agents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  display_name text not null,
  counties text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notification_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  channels jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.safety_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete set null,
  conversation_id uuid references public.conversations(id) on delete set null,
  safety_level text not null,
  reason text not null,
  redacted_excerpt text,
  created_at timestamptz not null default now()
);

create table public.ai_response_reviews (
  id uuid primary key default uuid_generate_v4(),
  message_id uuid references public.messages(id) on delete set null,
  reviewer_id uuid references public.users(id) on delete set null,
  status text not null,
  note text,
  created_at timestamptz not null default now()
);

create table public.prompt_versions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  version text not null,
  prompt_hash text not null,
  active boolean not null default false,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.model_configurations (
  id uuid primary key default uuid_generate_v4(),
  provider text not null,
  model text not null,
  max_input_chars int not null default 1200,
  max_output_tokens int not null default 700,
  daily_budget numeric,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.system_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.users(id) on delete set null,
  action text not null,
  target_table text,
  target_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index idx_profiles_user on public.profiles(user_id) where deleted_at is null;
create index idx_appointments_user_status on public.appointments(user_id, status) where deleted_at is null;
create index idx_referrals_user_status on public.referrals(user_id, current_status) where deleted_at is null;
create index idx_conversations_user_updated on public.conversations(user_id, updated_at desc) where deleted_at is null;
create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_documents_status_active on public.knowledge_documents(approval_status, is_active) where deleted_at is null;
create index idx_chunks_document on public.knowledge_chunks(document_id) where deleted_at is null;
create index idx_chunks_search on public.knowledge_chunks using gin(search_vector);
create index idx_chunks_embedding on public.knowledge_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index idx_tickets_status_priority on public.escalation_tickets(status, priority) where deleted_at is null;
create index idx_analytics_event_created on public.analytics_events(event_name, created_at);
create index idx_audit_logs_created on public.audit_logs(created_at desc);

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.user_consents enable row level security;
alter table public.family_members enable row level security;
alter table public.appointments enable row level security;
alter table public.referrals enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.message_feedback enable row level security;
alter table public.escalation_tickets enable row level security;
alter table public.ticket_messages enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.audit_logs enable row level security;

create policy "citizens read own profile" on public.profiles for select using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "citizens update own profile" on public.profiles for update using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "citizens own family" on public.family_members for all using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "citizens own appointments" on public.appointments for select using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "citizens own referrals" on public.referrals for select using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "citizens own conversations" on public.conversations for all using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "citizens own tickets" on public.escalation_tickets for all using (user_id in (select id from public.users where auth_user_id = auth.uid()));
create policy "assistant approved active docs" on public.knowledge_documents for select using (approval_status = 'approved' and is_active = true and deleted_at is null);
create policy "assistant approved active chunks" on public.knowledge_chunks for select using (
  deleted_at is null and exists (
    select 1 from public.knowledge_documents d
    where d.id = knowledge_chunks.document_id and d.approval_status = 'approved' and d.is_active = true and d.deleted_at is null
  )
);
create policy "auditors read logs" on public.audit_logs for select using (
  exists (select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('auditor','administrator'))
);

