-- Complete Database Setup Script
-- Copy and paste this entire script into Supabase Dashboard > SQL Editor
-- Then click "Run" to execute all migrations

-- Migration 1: Consultation Bookings Table
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for consultation_bookings
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.consultation_bookings;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.consultation_bookings;

-- Create policies for consultation_bookings
CREATE POLICY "Allow anonymous inserts" ON public.consultation_bookings
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON public.consultation_bookings
  FOR SELECT TO authenticated USING (true);

-- Migration 2: Home Content Table
CREATE TABLE IF NOT EXISTS public.home_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'stats', 'services', 'why_us_points', 'cta_banners'
  item_index INTEGER NOT NULL DEFAULT 0,
  title TEXT,
  subtitle TEXT,
  value TEXT,
  label TEXT,
  description TEXT,
  text TEXT,
  heading TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_content_item') THEN
        ALTER TABLE public.home_content ADD CONSTRAINT unique_content_item UNIQUE (content_type, item_index);
    END IF;
END
$$;

-- Enable RLS for home_content
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.home_content;
DROP POLICY IF EXISTS "Allow anonymous read" ON public.home_content;

-- Create policies for home_content
CREATE POLICY "Allow authenticated full access" ON public.home_content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.home_content
  FOR SELECT TO anon USING (true);

-- Create index for home_content
CREATE INDEX IF NOT EXISTS idx_home_content_type ON public.home_content(content_type);

-- Migration 3: About Content Table
CREATE TABLE IF NOT EXISTS public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'team_member', 'milestone', 'story', 'mission_vision'
  item_index INTEGER NOT NULL DEFAULT 0,
  name TEXT,
  role TEXT,
  image TEXT,
  bio TEXT,
  year TEXT,
  text TEXT,
  heading TEXT,
  subtitle TEXT,
  paragraphs TEXT[], -- JSON array for story paragraphs
  mission TEXT,
  vision TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_about_content_item') THEN
        ALTER TABLE public.about_content ADD CONSTRAINT unique_about_content_item UNIQUE (content_type, item_index);
    END IF;
END
$$;

-- Enable RLS for about_content
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.about_content;
DROP POLICY IF EXISTS "Allow anonymous read" ON public.about_content;

-- Create policies for about_content
CREATE POLICY "Allow authenticated full access" ON public.about_content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.about_content
  FOR SELECT TO anon USING (true);

-- Create index for about_content
CREATE INDEX IF NOT EXISTS idx_about_content_type ON public.about_content(content_type);

-- Migration 4: Business Contact Information Table
CREATE TABLE IF NOT EXISTS public.business_contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL DEFAULT 'contact_info', -- 'contact_info', 'office_hours', 'map_settings'
  item_index INTEGER NOT NULL DEFAULT 0,
  title TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  google_maps_url TEXT,
  office_hours JSONB DEFAULT '{}', -- Store structured office hours data
  additional_info TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_business_contact_item') THEN
        ALTER TABLE public.business_contact ADD CONSTRAINT unique_business_contact_item UNIQUE (content_type, item_index);
    END IF;
END
$$;

-- Enable RLS for business_contact
ALTER TABLE public.business_contact ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.business_contact;
DROP POLICY IF EXISTS "Allow anonymous read" ON public.business_contact;

-- Create policies for business_contact
CREATE POLICY "Allow authenticated full access" ON public.business_contact
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.business_contact
  FOR SELECT TO anon USING (true);

-- Create index for business_contact
CREATE INDEX IF NOT EXISTS idx_business_contact_type ON public.business_contact(content_type);

-- Migration 5: Contact Form Submissions Table (for user submissions)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.contact_submissions;

-- Create policies for contact_submissions
CREATE POLICY "Allow anonymous inserts" ON public.contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON public.contact_submissions
  FOR SELECT TO authenticated USING (true);

-- Migration 5: Blog Categories Table
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for blog_categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.blog_categories;
DROP POLICY IF EXISTS "Allow anonymous read" ON public.blog_categories;

-- Create policies for blog_categories
CREATE POLICY "Allow authenticated full access" ON public.blog_categories
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.blog_categories
  FOR SELECT TO anon USING (true);

-- Create index for blog_categories
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories(slug);

-- Migration 6: Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  body TEXT,
  featured BOOLEAN DEFAULT FALSE,
  image TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow anonymous read" ON public.blog_posts;

-- Create policies for blog_posts
CREATE POLICY "Allow authenticated full access" ON public.blog_posts
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.blog_posts
  FOR SELECT TO anon USING (published = true);

-- Create indexes for blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category_id);

-- Migration 7: Admin Profile Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL, -- References auth.users.id
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  avatar_url TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{}', -- Store user preferences as JSON
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.admin_profiles;
DROP POLICY IF EXISTS "Allow users own profile" ON public.admin_profiles;

-- Create policies for admin_profiles
CREATE POLICY "Allow authenticated full access" ON public.admin_profiles
  FOR ALL TO authenticated USING (true);

-- Create index for admin_profiles
CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON public.admin_profiles(user_id);

-- Migration 8: Services Content Table (existing, but included for completeness)
CREATE TABLE IF NOT EXISTS public.services_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL DEFAULT 'service',
  item_index INTEGER NOT NULL DEFAULT 0,
  service_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  features TEXT[], -- JSON array for features list
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_service_id') THEN
        ALTER TABLE public.services_content ADD CONSTRAINT unique_service_id UNIQUE (service_id);
    END IF;
END
$$;

-- Enable RLS for services_content
ALTER TABLE public.services_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.services_content;
DROP POLICY IF EXISTS "Allow anonymous read" ON public.services_content;

-- Create policies for services_content
CREATE POLICY "Allow authenticated full access" ON public.services_content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.services_content
  FOR SELECT TO anon USING (true);

-- Create indexes for services_content
CREATE INDEX IF NOT EXISTS idx_services_content_id ON public.services_content(service_id);
CREATE INDEX IF NOT EXISTS idx_services_content_index ON public.services_content(item_index);

-- Create or update the timestamp function (if it doesn't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (if they don't exist)
DROP TRIGGER IF EXISTS update_home_content_updated_at ON public.home_content;
CREATE TRIGGER update_home_content_updated_at 
    BEFORE UPDATE ON public.home_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_about_content_updated_at ON public.about_content;
CREATE TRIGGER update_about_content_updated_at 
    BEFORE UPDATE ON public.about_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_business_contact_updated_at ON public.business_contact;
CREATE TRIGGER update_business_contact_updated_at 
    BEFORE UPDATE ON public.business_contact 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_content_updated_at ON public.services_content;
CREATE TRIGGER update_services_content_updated_at 
    BEFORE UPDATE ON public.services_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON public.blog_categories;
CREATE TRIGGER update_blog_categories_updated_at 
    BEFORE UPDATE ON public.blog_categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON public.blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER update_admin_profiles_updated_at 
    BEFORE UPDATE ON public.admin_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Verification query to check all tables were created
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'consultation_bookings', 
    'home_content', 
    'about_content', 
    'services_content',
    'business_contact',
    'contact_submissions',
    'blog_categories',
    'blog_posts',
    'admin_profiles'
)
ORDER BY table_name;

-- Success message
SELECT 'Database setup completed successfully! All tables and policies have been created.' as status;
