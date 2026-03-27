-- Admin User Creation Script
-- Run this after the main setup script to create the admin user

-- Create admin user in auth.users
INSERT INTO auth.users (
  id,
  email,
  phone,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'td@dcpl.bt',
  NULL,
  now(),
  now(),
  now(),
  '{"name": "Indra Adhikari", "role": "admin"}'
) ON CONFLICT (email) DO NOTHING;

-- Create admin profile
INSERT INTO public.admin_profiles (
  user_id,
  name,
  email,
  role,
  preferences
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'td@dcpl.bt'),
  'Indra Adhikari',
  'td@dcpl.bt',
  'admin',
  '{"theme": "dark", "notifications": true}'
) ON CONFLICT (user_id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  updated_at = now();

-- Set admin password (this would normally be done through Supabase Auth)
-- Note: You'll need to set the password through Supabase Dashboard > Authentication > Users
-- Or use the Supabase CLI to set the password: Dcpl@123

SELECT 'Admin user created successfully. Please set password Dcpl@123 through Supabase Dashboard.' as status;
