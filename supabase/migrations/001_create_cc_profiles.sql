-- CoachConnect Profiles Table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

CREATE TABLE IF NOT EXISTS public.cc_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  avatar_url TEXT,
  banner_color TEXT DEFAULT '#0A1628',
  title TEXT,
  institution TEXT,
  sport TEXT,
  level TEXT,
  location TEXT,
  state TEXT,
  years_experience INTEGER DEFAULT 0,
  philosophy TEXT,
  bio TEXT,
  roles TEXT[] DEFAULT '{}',
  systems TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  awards TEXT[] DEFAULT '{}',
  conferences TEXT[] DEFAULT '{}',
  recruiting_territories TEXT[] DEFAULT '{}',
  scheme_tags TEXT[] DEFAULT '{}',
  culture_tags TEXT[] DEFAULT '{}',
  side_of_ball TEXT,
  open_to_opportunities BOOLEAN DEFAULT false,
  availability_status TEXT DEFAULT 'not_looking',
  is_verified BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  role TEXT DEFAULT 'coach',
  profile_views INTEGER DEFAULT 0,
  search_appearances INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cc_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read any profile
CREATE POLICY "Profiles are viewable by everyone"
  ON public.cc_profiles
  FOR SELECT
  USING (true);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.cc_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.cc_profiles
  FOR UPDATE
  USING (auth.uid() = id);
