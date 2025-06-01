// Test script to verify Supabase connection and table creation
import { supabase } from './src/lib/supabase.js';

async function testSupabase() {
  console.log('🧪 Testing Supabase connection...');
  
  try {
    // Test 1: Check if we can connect to Supabase
    console.log('1. Testing connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('urls')
      .select('count', { count: 'exact', head: true });
    
    if (connectionError) {
      console.error('❌ Connection failed:', connectionError.message);
      return;
    }
    
    console.log('✅ Connection successful!');
    
    // Test 2: Try to insert a test record
    console.log('2. Testing insert...');
    const testRecord = {
      original_url: 'https://example.com',
      short_code: 'test123',
      click_count: 0
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('urls')
      .insert([testRecord])
      .select();
    
    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return;
    }
    
    console.log('✅ Insert successful!', insertData);
    
    // Test 3: Try to read the record back
    console.log('3. Testing select...');
    const { data: selectData, error: selectError } = await supabase
      .from('urls')
      .select('*')
      .eq('short_code', 'test123');
    
    if (selectError) {
      console.error('❌ Select failed:', selectError.message);
      return;
    }
    
    console.log('✅ Select successful!', selectData);
    
    // Clean up: Delete test record
    console.log('4. Cleaning up...');
    const { error: deleteError } = await supabase
      .from('urls')
      .delete()
      .eq('short_code', 'test123');
    
    if (deleteError) {
      console.log('⚠️ Cleanup warning:', deleteError.message);
    } else {
      console.log('✅ Cleanup successful!');
    }
    
    console.log('🎉 All tests passed! Your Supabase setup is working correctly.');
    
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

testSupabase();
