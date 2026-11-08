-- Run after at least one authenticated user has signed up.
-- This helper is safe to run repeatedly.

insert into public.resources (title, category, description, url, is_published)
values
  (
    'SADAG Healthcare Worker Support Line',
    'Mental Health',
    'Confidential counselling and referral support for South African healthcare workers.',
    'tel:0800212223',
    true
  ),
  (
    'Workplace Wellness Helpline',
    'Burnout',
    'Practical support for burnout, compassion fatigue, workload pressure, and recovery planning.',
    null,
    true
  ),
  (
    'Trauma Support for Healthcare Workers',
    'Mental Health',
    'Grounding and trauma-informed support after difficult clinical events or patient loss.',
    null,
    true
  ),
  (
    'Healthcare Worker Legal Rights',
    'Legal Rights',
    'Confidential guidance on workplace rights, reporting pathways, and professional protection.',
    null,
    true
  ),
  (
    'Night Shift Safety and De-escalation',
    'Safety',
    'A practical safety and de-escalation guide for overnight and high-pressure clinical teams.',
    null,
    true
  )
on conflict (title) do update
set category = excluded.category,
    description = excluded.description,
    url = excluded.url,
    is_published = excluded.is_published,
    updated_at = now();

do $$
begin
  if not exists (select 1 from public.profiles) then
    raise notice 'No profile exists yet; demo posts were skipped. Sign up one user and rerun this seed.';
  end if;
end;
$$;

with demo_author as (
  select id
  from public.profiles
  order by created_at
  limit 1
)
insert into public.posts (author_id, body, category, is_anonymous)
select demo_author.id, demo.body, demo.category, true
from demo_author
cross join (
  values
    (
      'After three consecutive night shifts, what helps you reset before the next handover? Sharing small routines that have worked for our team.',
      'Night Shift Support'::text
    ),
    (
      'CHW teams: how are you protecting short breaks when the outreach list keeps growing? Looking for realistic ideas that work in busy clinics.',
      'CHW Community'::text
    ),
    (
      'A difficult case stayed with me after my shift today. I am grateful for peer spaces where we can debrief without judgement or patient-identifying details.',
      'Nursing'::text
    )
) as demo(body, category)
where not exists (
  select 1
  from public.posts existing
  where existing.body = demo.body
);
