import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://rkxtfzldkqxyodsvytzw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJreHRmemxka3F4eW9kc3Z5dHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTMwMzUsImV4cCI6MjA5MDE4OTAzNX0.YGwg6FXPMgXxB3tA8-i8O3OkJ1qfRYdSxP7TB3_Qqmk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkActualSchema() {
  console.log('🔍 Checking actual database schema...\n');
  
  try {
    // Method 1: Query information_schema directly
    console.log('📋 Method 1: Querying information_schema...');
    const { data: schemaData, error: schemaError } = await supabase
      .rpc('get_schema_tables');
    
    if (schemaError) {
      console.log('   ❌ RPC method failed:', schemaError.message);
    } else {
      console.log('   ✅ Schema data:', schemaData);
    }
    
    // Method 2: Check each table individually with a more detailed approach
    console.log('\n📋 Method 2: Detailed table checks...');
    
    const tables = ['consultation_bookings', 'home_content', 'about_content', 'services_content'];
    
    for (const tableName of tables) {
      console.log(`\n🔍 Checking table: ${tableName}`);
      
      // Try to get table structure
      try {
        const { data: tableData, error: tableError } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (tableError) {
          console.log(`   ❌ Table access error: ${tableError.message}`);
          console.log(`   Details: ${tableError.hint || 'No additional details'}`);
          console.log(`   Code: ${tableError.code}`);
        } else {
          console.log(`   ✅ Table accessible`);
          console.log(`   📊 Sample data:`, tableData);
        }
      } catch (err) {
        console.log(`   ❌ Exception: ${err.message}`);
      }
      
      // Try to get column information
      try {
        const { data: columnsData, error: columnsError } = await supabase
          .from(tableName)
          .select('column_name')
          .limit(1);
          
        if (columnsError && !columnsError.message.includes('column_name')) {
          console.log(`   📋 Columns check: ${columnsError.message}`);
        }
      } catch (err) {
        // Expected to fail, just checking if table exists
      }
    }
    
    // Method 3: Use a raw SQL query if possible
    console.log('\n📋 Method 3: Raw SQL approach...');
    
    try {
      // This will likely fail with anon key, but let's try
      const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename, tableowner')
        .eq('schemaname', 'public')
        .in('tablename', tables);
        
      if (error) {
        console.log(`   ❌ pg_tables access: ${error.message}`);
      } else {
        console.log(`   ✅ pg_tables data:`, data);
      }
    } catch (err) {
      console.log(`   ❌ pg_tables exception: ${err.message}`);
    }
    
    // Method 4: Check what we can actually see
    console.log('\n📋 Method 4: Check accessible objects...');
    
    try {
      // Try to list what we can see
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name, table_type')
        .eq('table_schema', 'public')
        .eq('table_type', 'BASE TABLE');
        
      if (error) {
        console.log(`   ❌ information_schema access: ${error.message}`);
      } else {
        console.log(`   ✅ Accessible tables:`, data);
      }
    } catch (err) {
      console.log(`   ❌ information_schema exception: ${err.message}`);
    }
    
  } catch (error) {
    console.error('❌ Schema check failed:', error);
  }
}

async function checkWithServiceKey() {
  console.log('\n🔑 Note: With service role key, we could get more accurate results');
  console.log('Current check uses anon key, which has limited permissions');
  console.log('The discrepancy might be due to:');
  console.log('1. Tables exist but aren\'t visible in dashboard due to permissions');
  console.log('2. Tables exist in a different schema');
  console.log('3. Dashboard cache needs refresh');
  console.log('4. Verification script is giving false positives');
}

async function main() {
  await checkActualSchema();
  await checkWithServiceKey();
  
  console.log('\n📋 Recommendation:');
  console.log('1. Refresh the Supabase dashboard page');
  console.log('2. Check if tables are in a different schema');
  console.log('3. Run the setup-database.sql script manually in SQL Editor');
  console.log('4. Contact Supabase support if dashboard shows incorrect info');
}

main();
