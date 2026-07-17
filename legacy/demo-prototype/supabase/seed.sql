insert into public.users (id, role) values
('00000000-0000-4000-8000-000000000001','citizen'),
('90000000-0000-4000-8000-000000000001','support_agent'),
('90000000-0000-4000-8000-000000000002','support_agent')
on conflict do nothing;

insert into public.profiles (user_id, first_name, last_name, mobile, province, county, consent_status)
values ('00000000-0000-4000-8000-000000000001','مریم','رضایی','09121234567','تهران','بهارستان','{"service": true, "marketing": false}')
on conflict do nothing;

insert into public.physicians (id, name, role, medical_system_number_placeholder, county, service_hours, phone, address)
values ('10000000-0000-4000-8000-000000000001','دکتر سارا احمدی','پزشک خانواده','شماره نظام پزشکی نمایشی','بهارستان','شنبه تا چهارشنبه، ۸ تا ۱۴','02155555555','بهارستان، خیابان سلامت، پلاک ۱۲')
on conflict do nothing;

insert into public.health_centers (id, name, province, county, phone, address, service_hours)
values
('20000000-0000-4000-8000-000000000001','مرکز جامع سلامت امید','تهران','بهارستان','02155555555','بهارستان، خیابان سلامت، پلاک ۱۲','۸ تا ۱۴'),
('20000000-0000-4000-8000-000000000002','پایگاه سلامت نیایش','تهران','بهارستان','02155555556','بهارستان، بلوار نیایش، کوچه ۴','۸ تا ۱۳')
on conflict do nothing;

insert into public.system_settings (key, value) values
('emergency_guidance','{"message":"این دستیار امکان ارزیابی وضعیت اورژانسی را ندارد.","contact_label":"خدمات اورژانس یا نزدیک‌ترین مرکز درمانی"}'),
('rag','{"relevance_threshold":0.18,"top_k":8,"rerank_top_k":5}'),
('privacy','{"retention_days":180,"logging_level":"audit_safe"}')
on conflict (key) do update set value = excluded.value;

