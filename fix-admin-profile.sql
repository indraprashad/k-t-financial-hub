-- Create admin profile for the existing user
INSERT INTO public.admin_profiles (
    user_id,
    name,
    email,
    role,
    preferences
) VALUES (
    '7288a625-3154-48ae-a714-5f3282355474', -- The user ID from the error
    'Indra Adhikari',
    'td@dcpl.bt',
    'admin',
    '{"theme": "dark", "notifications": true}'
) ON CONFLICT (user_id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    updated_at = now();
