// auth.js – Connexion et inscription

async function inscription() {
  if (!window.supabaseClient) {
    document.getElementById('message-login').textContent = 'Erreur : Supabase non chargé. Recharge la page.';
    document.getElementById('message-login').style.color = '#ff6b6b';
    console.error("window.supabaseClient undefined dans inscription()");
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

  const { data, error } = await window.supabaseClient.auth.signUp({
    email: `${pseudo}@example.com`,
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
  if (!window.supabaseClient) {
    document.getElementById('message-login').textContent = 'Erreur : Supabase non chargé. Recharge la page.';
    document.getElementById('message-login').style.color = '#ff6b6b';
    console.error("window.supabaseClient undefined dans connexion()");
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

  const { data, error } = await window.supabaseClient.auth.signInWithPassword({
    email: `${pseudo}@tempmail.com`,
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
      // Plus tard : bascule vers ListeAnimes
    }, 1500);
  }
}
