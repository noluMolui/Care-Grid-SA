create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 120),
  role text not null check (role in ('Community Health Worker', 'Nurse', 'Clinic Support', 'Facilitator', 'Admin')),
  facility text not null check (char_length(facility) between 2 and 160),
  phone text,
  notifications_enabled boolean not null default true,
  theme text not null default 'system' check (theme in ('system', 'light', 'dark')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null unique check (char_length(title) between 2 and 160),
  category text not null check (category in ('Burnout', 'Legal Rights', 'Safety', 'Mental Health')),
  description text not null,
  url text,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  fatigue smallint not null check (fatigue between 1 and 5),
  mood smallint not null check (mood between 1 and 5),
  hours_worked numeric(4,1) check (hours_worked between 0 and 24),
  shift_type text not null check (shift_type in ('Day Shift', 'Night Shift', 'Overtime')),
  notes text check (notes is null or char_length(notes) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  category text not null default 'General' check (category in ('General', 'Nursing', 'CHW')),
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resource_bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, resource_id)
);

create table if not exists public.post_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (char_length(reason) between 10 and 500),
  created_at timestamptz not null default now(),
  unique (post_id, reporter_id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, facility, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'CareGrid member'),
    case
      when new.raw_user_meta_data ->> 'role' in ('Community Health Worker', 'Nurse', 'Clinic Support', 'Facilitator')
        then new.raw_user_meta_data ->> 'role'
      else 'Community Health Worker'
    end,
    coalesce(new.raw_user_meta_data ->> 'facility', 'Unassigned facility'),
    new.phone
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create index if not exists check_ins_user_created_idx on public.check_ins(user_id, created_at desc);
create index if not exists posts_created_idx on public.posts(created_at desc);
create index if not exists resources_category_idx on public.resources(category);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists resources_updated_at on public.resources;
create trigger resources_updated_at before update on public.resources
for each row execute function public.set_updated_at();
drop trigger if exists check_ins_updated_at on public.check_ins;
create trigger check_ins_updated_at before update on public.check_ins
for each row execute function public.set_updated_at();
drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at before update on public.posts
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'Admin'
  );
$$;

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  delete from auth.users where id = (select auth.uid());
end;
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;

alter table public.profiles enable row level security;
alter table public.resources enable row level security;
alter table public.check_ins enable row level security;
alter table public.posts enable row level security;
alter table public.resource_bookmarks enable row level security;
alter table public.post_reports enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated
using (id = (select auth.uid()) or public.is_admin());
create policy "profiles_insert_own" on public.profiles for insert to authenticated
with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles for update to authenticated
using (id = (select auth.uid()) or public.is_admin())
with check (id = (select auth.uid()) or public.is_admin());
create policy "profiles_delete_own" on public.profiles for delete to authenticated
using (id = (select auth.uid()) or public.is_admin());

create policy "resources_select_published" on public.resources for select to authenticated
using (is_published or public.is_admin());
create policy "resources_admin_insert" on public.resources for insert to authenticated
with check (public.is_admin());
create policy "resources_admin_update" on public.resources for update to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy "resources_admin_delete" on public.resources for delete to authenticated
using (public.is_admin());

create policy "check_ins_select_own" on public.check_ins for select to authenticated
using (user_id = (select auth.uid()));
create policy "check_ins_insert_own" on public.check_ins for insert to authenticated
with check (user_id = (select auth.uid()));
create policy "check_ins_update_own" on public.check_ins for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "check_ins_delete_own" on public.check_ins for delete to authenticated
using (user_id = (select auth.uid()));

create policy "posts_select_authenticated" on public.posts for select to authenticated
using (true);
create policy "posts_insert_own" on public.posts for insert to authenticated
with check (author_id = (select auth.uid()));
create policy "posts_update_own" on public.posts for update to authenticated
using (author_id = (select auth.uid()) or public.is_admin())
with check (author_id = (select auth.uid()) or public.is_admin());
create policy "posts_delete_own" on public.posts for delete to authenticated
using (author_id = (select auth.uid()) or public.is_admin());

create policy "bookmarks_select_own" on public.resource_bookmarks for select to authenticated
using (user_id = (select auth.uid()));
create policy "bookmarks_insert_own" on public.resource_bookmarks for insert to authenticated
with check (user_id = (select auth.uid()));
create policy "bookmarks_delete_own" on public.resource_bookmarks for delete to authenticated
using (user_id = (select auth.uid()));

create policy "reports_insert_own" on public.post_reports for insert to authenticated
with check (reporter_id = (select auth.uid()));
create policy "reports_select_own_or_admin" on public.post_reports for select to authenticated
using (reporter_id = (select auth.uid()) or public.is_admin());

insert into public.resources (title, category, description, url, is_published)
values
  ('SADAG Healthcare Worker Support Line', 'Mental Health', 'Confidential counselling and referral support for South African healthcare workers.', 'tel:0800212223', true),
  ('Workplace Wellness Helpline', 'Burnout', 'Practical support for burnout, compassion fatigue, workload pressure, and recovery planning.', null, true),
  ('Trauma Support for Healthcare Workers', 'Mental Health', 'Grounding and trauma-informed support after difficult clinical events or patient loss.', null, true),
  ('Healthcare Worker Legal Rights', 'Legal Rights', 'Confidential guidance on workplace rights, reporting pathways, and professional protection.', null, true),
  ('Night Shift Safety and De-escalation', 'Safety', 'A practical safety and de-escalation guide for overnight and high-pressure clinical teams.', null, true)
on conflict (title) do update
set category = excluded.category,
    description = excluded.description,
    url = excluded.url,
    is_published = excluded.is_published,
    updated_at = now();
