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
    email: `${pseudo}@tracker.local`,  // astuce pour ne pas demander d'email réel
    password: mdp,
    options: {
      data: { pseudo: pseudo }  // stocke le pseudo dans les métadonnées utilisateur
    }
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
    email: `${pseudo}@tracker.local`,
    password: mdp
  });

  if (error) {
    message.textContent = 'Erreur : ' + error.message;
    message.style.color = '#ff6b6b';
  } else {
    message.textContent = 'Connecté ! Chargement...';
    message.style.color = '#a8d5ba';

    // Pour l’instant on affiche juste un message
    // Plus tard : on cachera le formulaire et on chargera les données
    setTimeout(() => {
      document.getElementById('page-accueil').style.display = 'none';
      // On pourra afficher la liste anime par défaut ici
    }, 1500);
  }
}
