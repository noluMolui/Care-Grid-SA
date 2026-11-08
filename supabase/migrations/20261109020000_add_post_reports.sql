create table if not exists public.post_reports (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (char_length(reason) between 10 and 500),
  created_at timestamptz not null default now(),
  unique (post_id, reporter_id)
);

alter table public.post_reports enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'post_reports' and policyname = 'reports_insert_own') then
    create policy "reports_insert_own" on public.post_reports for insert to authenticated
      with check (reporter_id = (select auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'post_reports' and policyname = 'reports_select_own_or_admin') then
    create policy "reports_select_own_or_admin" on public.post_reports for select to authenticated
      using (reporter_id = (select auth.uid()) or public.is_admin());
  end if;
end
$$;
