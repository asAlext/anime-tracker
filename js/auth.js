// auth.js – Connexion et inscription

async function inscription() {
  // Sécurité : on attend que supabase soit chargé
  if (!window.supabaseClient) {
    document.getElementById('message-login').textContent = 'Supabase n’est pas prêt. Recharge la page (Ctrl + Shift + R).';
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

  const email = `${pseudo}@mailinator.com`; // domaine temporaire valide

  const { data, error } = await window.supabaseClient.auth.signUp({
    email: email,
    password: mdp,
    options: { data: { pseudo } }
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = '#ff6b6b';
  } else {
    message.textContent = 'Compte créé ! Va sur mailinator.com, tape "' + pseudo + '" et confirme le lien.';
    message.style.color = '#a8d5ba';
  }
}

async function connexion() {
  if (!window.supabaseClient) {
    document.getElementById('message-login').textContent = 'Supabase n’est pas prêt. Recharge la page (Ctrl + Shift + R).';
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

  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
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
