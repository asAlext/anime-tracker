// === SUPABASE CONFIG ===
const SUPABASE_URL = 'https://adbahafsimtjcclvuqxa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYmFoYWZzaW10amNjbHZ1cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzM0MTQsImV4cCI6MjA4NzU0OTQxNH0.qyXqZAz-OYiZMPBISHtqJSeRvTVvpbXbK8JGaALKYZo';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase chargé depuis config.js :", supabase ? "OK" : "Erreur");
