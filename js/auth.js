// auth.js – Connexion et inscription

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
    email: `${pseudo}@example.com`,  // Changé pour un domaine valide réservé aux tests
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

  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${pseudo}@example.com`,  // Changé pour un domaine valide réservé aux tests
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
      // Plus tard : on basculera vers la page ListeAnimes ou Accueil plus tard
    }, 1500);
  }
}
