// auth.js - SANS AUCUNE DÉCLARATION DE SUPABASE
async function inscription() {
  const pseudo = document.getElementById('pseudo').value.trim();
  const mdp = document.getElementById('mdp').value.trim();
  const message = document.getElementById('message-login');
  if (!pseudo || !mdp) {
    message.textContent = 'Remplis pseudo et mot de passe';
    message.style.color = '#ff6b6b';
    return;
  }
  const { data, error } = await supabaseClient.auth.signUp({
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

async function connexion() {
  const pseudo = document.getElementById('pseudo').value.trim();
  const mdp = document.getElementById('mdp').value.trim();
  const message = document.getElementById('message-login');
  if (!pseudo || !mdp) {
    message.textContent = 'Remplis pseudo et mot de passe';
    message.style.color = '#ff6b6b';
    return;
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({
  email: `${pseudo}@tracker.local`,
  password: mdp
});
  if (error) {
    message.textContent = 'Erreur : ' + error.message;
    message.style.color = '#ff6b6b';
  } else {
    message.textContent = 'Connecté ! Chargement...';
    message.style.color = '#a8d5ba';
    setTimeout(() => {
      document.getElementById('page-accueil').style.display = 'none';
    }, 1500);
  }
}

// Test session au chargement (supprime plus tard)
supabase.auth.getSession().then(({ data }) => {
  if (data.session) {
    console.log("Tu es déjà connecté ! User ID :", data.session.user.id);
  } else {
    console.log("Pas de session active (normal si pas connecté)");
  }
});
