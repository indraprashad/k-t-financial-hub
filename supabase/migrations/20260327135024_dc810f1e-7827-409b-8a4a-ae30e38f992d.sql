CREATE TABLE public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.consultation_bookings
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON public.consultation_bookings
  FOR SELECT TO authenticated USING (true);