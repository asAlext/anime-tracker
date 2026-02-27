// SUPABASE CONFIG - CORRECTE ET UNIQUE
const SUPABASE_URL = 'https://adbahafsimtjcclvuqxa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYmFoYWZzaW10amNjbHZ1cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzM0MTQsImV4cCI6MjA4NzU0OTQxNH0.qyXqZAz-OYiZMPBISHtqJSeRvTVvpbXbK8JGaALKYZo';

// Utilise la variable globale 'supabase' déjà définie par le CDN
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exporte le client globalement pour les autres fichiers
window.supabaseClient = client;

// Tests de chargement (tu peux supprimer ces lignes plus tard)
console.log("Supabase chargé depuis config.js :", client ? "OK" : "Erreur");
console.log("config.js exécuté");
console.log("supabase défini ?", !!supabase);
