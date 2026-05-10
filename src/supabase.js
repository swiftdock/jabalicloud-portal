import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://gfrzremrjgpntgncygok.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmcnpyZW1yamdwbnRnbmN5Z29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNTc4OTAsImV4cCI6MjA5MzkzMzg5MH0.7B17TLSMTQZreOTdGdA43L7jPN2uaxTLfZJ5Q0hPCfw'
);
