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
