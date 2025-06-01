-- Create the urls table for storing shortened URLs
CREATE TABLE IF NOT EXISTS urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(255) UNIQUE NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on short_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);

-- Create an index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on urls" ON urls
  FOR ALL USING (true);
