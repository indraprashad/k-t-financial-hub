# Database Setup Guide

## 🚀 Complete Database Setup Instructions

### Step 1: Run Database Migrations
1. Open Supabase Dashboard: https://supabase.com/dashboard/project/rkxtfzldkqxyodsvytzw
2. Go to **SQL Editor**
3. Copy the entire contents of `setup-database.sql`
4. Paste and click **"Run"**
5. Verify all 9 tables are created

### Step 2: Create Admin User
1. In SQL Editor, run `create-admin-user.sql`
2. Go to **Authentication** → **Users**
3. Find user `td@dcpl.bt`
4. Click **Reset Password** and set it to `Dcpl@123`

### Step 3: Seed Initial Data
1. In SQL Editor, run `seed-initial-data.sql`
2. This will populate all tables with initial content

### Step 4: Update Code
1. Replace imports from `contentStore.ts` to `tempStore.ts`
2. After database is ready, replace with `databaseStore.ts`

## 📋 Database Schema (9 Tables)

| Table | Purpose | Admin Access | Public Access |
|-------|---------|--------------|---------------|
| `consultation_bookings` | User consultation bookings | ✅ Read | ✅ Create |
| `home_content` | Dynamic home page content | ✅ Full CRUD | ✅ Read |
| `about_content` | About page content | ✅ Full CRUD | ✅ Read |
| `services_content` | Services & features | ✅ Full CRUD | ✅ Read |
| `business_contact` | Business contact info | ✅ Full CRUD | ✅ Read |
| `contact_submissions` | Contact form messages | ✅ Read | ✅ Create |
| `blog_categories` | Blog categories | ✅ Full CRUD | ✅ Read |
| `blog_posts` | Blog articles | ✅ Full CRUD | ✅ Read (published) |
| `admin_profiles` | Admin user profiles | ✅ Full CRUD | ❌ None |

## 🔐 Admin User Credentials

- **Name**: Indra Adhikari
- **Username**: td@dcpl.bt
- **Password**: Dcpl@123
- **Email**: indraprashadsharma4@gmail.com
- **Role**: admin

## 📧 Email Notifications

Consultation bookings will send emails to: `indraprashadsharma4@gmail.com`

## 🔄 Permission Structure

### Anonymous Users (Not Logged In):
- ✅ View all public content
- ✅ Book consultations
- ✅ Submit contact forms
- ❌ Cannot edit anything

### Admin Users (Logged In):
- ✅ Full CRUD on all content
- ✅ View bookings and submissions
- ✅ Manage business contact info
- ✅ Manage blog posts and categories

## 🛠 Next Steps After Setup

1. **Test Admin Login**: Use credentials above
2. **Verify Data Loading**: Check if content loads from database
3. **Test Consultation Booking**: Should trigger email + notification
4. **Test Contact Form**: Should store submissions
5. **Test Content Editing**: Changes should persist to database

## 🚨 Troubleshooting

### TypeScript Errors
- Expected until database tables exist
- Will resolve after running migrations
- Use `tempStore.ts` as temporary bridge

### Database Connection Issues
- Verify Supabase URL and keys in `.env`
- Check RLS policies are correct
- Ensure admin user is created

### Content Not Loading
- Run seed data script
- Check browser console for errors
- Verify database tables have data

## 📁 Files Created

- `setup-database.sql` - Complete database schema
- `create-admin-user.sql` - Admin user creation
- `seed-initial-data.sql` - Initial data population
- `databaseStore.ts` - Final database-first store (after setup)
- `tempStore.ts` - Temporary bridge (use now)
- `SETUP_GUIDE.md` - This guide

## 🎯 Success Criteria

✅ All 9 database tables created
✅ Admin user can login with provided credentials
✅ Content loads from database (not static)
✅ Consultation bookings work with email notifications
✅ Admin can edit all content types
✅ Public users can only read and submit forms
