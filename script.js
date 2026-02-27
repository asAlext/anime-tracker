// === SUPABASE CONFIG ===
const SUPABASE_URL = 'https://adbahafsimtjcclvuqxa.supabase.co';  // ← remplace si ton URL est différente
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkYmFoYWZzaW10amNjbHZ1cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzM0MTQsImV4cCI6MjA4NzU0OTQxNH0.qyXqZAz-OYiZMPBISHtqJSeRvTVvpbXbK8JGaALKYZo'; // ← colle TA vraie clé anon ici

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test immédiat (à laisser pour vérifier)
console.log("Tentative de connexion Supabase...");
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error("Erreur Supabase :", error.message);
  } else {
    console.log("Supabase OK ! Session :", data.session ? "connectée" : "non connectée");
  }
});

// Fonction inscription
async function inscription() {
  const pseudo = document.getElementById('pseudo').value.trim();
  const mdp = document.getElementById('mdp').value.trim();
  const message = document.getElementById('message-login');

  if (!pseudo || !mdp) {
    message.textContent = 'Remplis pseudo et mot de passe';
    message.style.color = '#ff6b6b';
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: `${pseudo}@tracker.local`,
    password: mdp,
    options: { data: { pseudo } }
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = '#ff6b6b';
  } else {
    message.textContent = 'Compte créé ! Connecte-toi maintenant.';
    message.style.color = '#a8d5ba';
  }
}

// Fonction connexion
async function connexion() {
  const pseudo = document.getElementById('pseudo').value.trim();
  const mdp = document.getElementById('mdp').value.trim();
  const message = document.getElementById('message-login');

  if (!pseudo || !mdp) {
    message.textContent = 'Remplis pseudo et mot de passe';
    message.style.color = '#ff6b6b';
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${pseudo}@tracker.local`,
    password: mdp
  });

  if (error) {
    message.textContent = 'Erreur : ' + error.message;
    message.style.color = '#ff6b6b';
  } else {
    message.textContent = 'Connecté ! Chargement...';
    message.style.color = '#a8d5ba';
    chargerDonneesSupabase();  // On appelle la fonction de chargement
  }
}
