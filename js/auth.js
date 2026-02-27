// auth.js – Connexion et inscription

async function inscription() {
  // Sécurité : on vérifie que supabase existe
  if (!window.supabase) {
    document.getElementById('message-login').textContent = 'Erreur : Supabase n’est pas chargé. Recharge la page.';
    document.getElementById('message-login').style.color = '#ff6b6b';
    return;
  }

  const pseudo = document.getElementById('pseudo').value.trim();
  const mdp = document.getElementById('mdp').value.trim();
  const message = document.getElementById('message-login');

  if (!pseudo || !mdp) {
    message.textContent = 'Remplis pseudo et mot de passe';
    message.style.color = '#ff6b6b';
    return;
  }

  // On utilise un domaine temporaire réel (change si tu veux)
  const email = `${pseudo}@mailinator.com`;

  const { data, error } = await window.supabase.auth.signUp({
    email: email,
    password: mdp,
    options: { data: { pseudo } }
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = '#ff6b6b';
  } else {
    message.textContent = 'Compte créé ! Va vérifier ton email sur mailinator.com pour confirmer.';
    message.style.color = '#a8d5ba';
  }
}

async function connexion() {
  if (!window.supabase) {
    document.getElementById('message-login').textContent = 'Erreur : Supabase n’est pas chargé. Recharge la page.';
    document.getElementById('message-login').style.color = '#ff6b6b';
    return;
  }

  const pseudo = document.getElementById('pseudo').value.trim();
  const mdp = document.getElementById('mdp').value.trim();
  const message = document.getElementById('message-login');

  if (!pseudo || !mdp) {
    message.textContent = 'Remplis pseudo et mot de passe';
    message.style.color = '#ff6b6b';
    return;
  }

  const email = `${pseudo}@mailinator.com`;

  const { data, error } = await window.supabase.auth.signInWithPassword({
    email: email,
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
