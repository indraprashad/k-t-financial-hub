-- Create table for storing dynamic home page content
CREATE TABLE public.home_content (
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

-- Add unique constraint for content type and index combination
ALTER TABLE public.home_content ADD CONSTRAINT unique_content_item UNIQUE (content_type, item_index);

-- Enable RLS
ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated full access" ON public.home_content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.home_content
  FOR SELECT TO anon USING (true);

-- Create index for better performance
CREATE INDEX idx_home_content_type ON public.home_content(content_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_home_content_updated_at 
    BEFORE UPDATE ON public.home_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
