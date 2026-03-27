-- Create table for storing services content
CREATE TABLE public.services_content (
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

-- Add unique constraint for service_id
ALTER TABLE public.services_content ADD CONSTRAINT unique_service_id UNIQUE (service_id);

-- Enable RLS
ALTER TABLE public.services_content ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated full access" ON public.services_content
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow anonymous read" ON public.services_content
  FOR SELECT TO anon USING (true);

-- Create index for better performance
CREATE INDEX idx_services_content_id ON public.services_content(service_id);
CREATE INDEX idx_services_content_index ON public.services_content(item_index);

-- Create trigger for updated_at
CREATE TRIGGER update_services_content_updated_at 
    BEFORE UPDATE ON public.services_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
