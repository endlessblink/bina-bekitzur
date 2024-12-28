-- Create the categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  name_english text,
  icon_url text,
  summary text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table categories enable row level security;

-- Create policies
create policy "Enable read access for all users" on categories
  for select using (true);

create policy "Enable insert for authenticated users only" on categories
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on categories
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on categories
  for delete using (auth.role() = 'authenticated');

-- Create function to automatically update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_categories_updated_at
  before update on categories
  for each row
  execute function update_updated_at_column();
