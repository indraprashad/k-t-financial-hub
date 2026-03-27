-- Create table for storing about page content
CREATE TABLE public.about_content (
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

-- Add unique constraint for content type and index combination
ALTER TABLE public.about_content ADD CONSTRAINT unique_about_content_item UNIQUE (content_type, item_index);

-- Enable RLS
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated full access" ON public.about_content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.about_content
  FOR SELECT TO anon USING (true);

-- Create index for better performance
CREATE INDEX idx_about_content_type ON public.about_content(content_type);

-- Create trigger for updated_at
CREATE TRIGGER update_about_content_updated_at 
    BEFORE UPDATE ON public.about_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
