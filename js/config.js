// SUPABASE CONFIG - CORRECTE ET UNIQUE
const SUPABASE_URL = 'https://adbahafsimtjcclvuqxa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYmFoYWZzaW10amNjbHZ1cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzM0MTQsImV4cCI6MjA4NzU0OTQxNH0.qyXqZAz-OYiZMPBISHtqJSeRvTVvpbXbK8JGaALKYZo';

// Utilise la variable globale 'supabase' déjà définie par le CDN
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test de chargement
console.log("Supabase chargé depuis config.js :", client ? "OK" : "Erreur");

// Exporte le client pour les autres fichiers (auth.js, etc.)
window.supabaseClient = client;  // ← on l'appelle supabaseClient pour éviter les conflits
