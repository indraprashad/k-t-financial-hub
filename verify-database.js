import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://rkxtfzldkqxyodsvytzw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJreHRmemxka3F4eW9kc3Z5dHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTMwMzUsImV4cCI6MjA5MDE4OTAzNX0.YGwg6FXPMgXxB3tA8-i8O3OkJ1qfRYdSxP7TB3_Qqmk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const expectedTables = [
  { name: 'consultation_bookings', description: 'Consultation booking requests' },
  { name: 'home_content', description: 'Dynamic home page content' },
  { name: 'about_content', description: 'About page content (team, milestones, etc.)' },
  { name: 'services_content', description: 'Services content and features' }
];

async function verifyDatabase() {
  console.log('🔍 Verifying database setup...\n');
  
  let allTablesExist = true;
  
  for (const table of expectedTables) {
    console.log(`📋 Checking table: ${table.name}`);
    console.log(`   Description: ${table.description}`);
    
    try {
      // Try to select from the table
      const { data, error, count } = await supabase
        .from(table.name)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`   ❌ Error: ${error.message}`);
        allTablesExist = false;
      } else {
        console.log(`   ✅ Table exists and is accessible`);
        console.log(`   📊 Current records: ${count || 0}`);
      }
    } catch (err) {
      console.log(`   ❌ Exception: ${err.message}`);
      allTablesExist = false;
    }
    
    console.log('');
  }
  
  if (allTablesExist) {
    console.log('🎉 All database tables are set up correctly!');
    console.log('\n📝 Next steps:');
    console.log('1. Your admin dashboard should now be able to sync with the database');
    console.log('2. Consultation bookings will be stored in the database');
    console.log('3. Content changes will be persisted across sessions');
  } else {
    console.log('❌ Some tables are missing. Please run the database setup:');
    console.log('\n📋 Setup Instructions:');
    console.log('1. Open Supabase Dashboard: https://supabase.com/dashboard/project/rkxtfzldkqxyodsvytzw');
    console.log('2. Go to SQL Editor');
    console.log('3. Copy the contents of setup-database.sql');
    console.log('4. Paste and run the script');
    console.log('5. Run this verification script again');
  }
}

// Test database connection
async function testConnection() {
  console.log('🔌 Testing database connection...');
  
  try {
    const { data, error } = await supabase
      .from('consultation_bookings')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Connection failed or table not accessible');
      console.log('   This is expected if migrations haven\'t been run yet');
      return false;
    } else {
      console.log('✅ Database connection successful');
      return true;
    }
  } catch (err) {
    console.log('❌ Connection error:', err.message);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  console.log('');
  
  if (connected) {
    await verifyDatabase();
  } else {
    console.log('📋 Setup Required:');
    console.log('Please run the database setup first:');
    console.log('1. Open Supabase Dashboard');
    console.log('2. Go to SQL Editor');
    console.log('3. Run the setup-database.sql script');
    console.log('4. Then run this verification again');
  }
}

main();
