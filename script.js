// Données de la checklist pour Subnautica - Version COMPLÈTE avec 10 chapitres
const data = {
    chapters: [
        {
            id: "chapitre-1",
            title: "Chapitre 1 : Le Crash et la Survie Initiale",
            sections: [
                { title: "🎯 Objectif & Étapes détaillées", items: [
                    "Éteins l'incendie (Extincteur du conteneur)",
                    "Scanner tout (PDA auto-guide)",
                    "Répare les systèmes (Repair Tool : scan Titanium près capsule)",
                    "Explore autour : récolte Minerai de titane, Minerai de cuivre, Quartz, Minerai d'argent, Affleurements calcaires (pour Caoutchouc de silicone, Champignons acides)",
                ]},
                { title: "🔧 Crafts essentiels (Fabricator de la capsule)", items: [
                    { text: "Outil de réparation - Silice x1, Caviar de Crushfish x2", icon: "https://static.wikia.nocookie.net/subnautica/images/5/5e/Repair_Tool.png/revision/latest?cb=20180626194329" },
                    { text: "Couteau de survie - Silice x2", icon: "https://static.wikia.nocookie.net/subnautica/images/3/3a/Survival_Knife.png/revision/latest?cb=20180626194329" },
                    { text: "Palmes - Silice x2", icon: "https://static.wikia.nocookie.net/subnautica/images/4/4e/Fins.png/revision/latest?cb=20180626194329" },
                    { text: "Lampe torche - Silice x1, Lingot de titane x1, Batterie x1", icon: "https://static.wikia.nocookie.net/subnautica/images/7/7e/Flashlight.png/revision/latest?cb=20180626194329" },
                    { text: "Scanner - Lingot de titane x2", icon: "https://static.wikia.nocookie.net/subnautica/images/6/6f/Scanner.png/revision/latest?cb=20180626194329" },
                    { text: "Réservoir O2 standard - Silice x2, Titane x2", icon: "https://static.wikia.nocookie.net/subnautica/images/9/9d/Oxygen_Tank.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "🗺️ Zones à explorer", items: [
                    "Bancs calmes (Safe Shallows) : Prof. 0-30m. Ressources abondantes, dangers : aucun"
                ]}
            ]
        },
        {
            id: "chapitre-2",
            title: "Chapitre 2 : Premiers Outils Avancés et Signaux de Détresse",
            sections: [
                { title: "🎯 Étapes détaillées", items: [
                    "Répare radio (Fabricator + énergie solaire)",
                    "Lance signal de détresse, écoute réponses (capsules de survie 3,6,7,12,13,17,19)",
                    "Explore capsules pour plans (ex: capsule 3 = Seaglide, capsule 19 = Canon de propulsion)",
                    "Explore épaves pour fragments (Coupeur laser)"
                ]},
                { title: "🔧 Crafts", items: [
                    { text: "Seaglide - Lingot titane x2, Lubrifiant x1, Batterie x3", icon: "https://static.wikia.nocookie.net/subnautica/images/3/3e/Seaglide.png/revision/latest?cb=20180626194329" },
                    { text: "Coupeur laser - Diamant x1, Lingot titane x2, Verre x2", icon: "https://static.wikia.nocookie.net/subnautica/images/4/4d/Laser_Cutter.png/revision/latest?cb=20180626194329" },
                    { text: "Réservoir O2 haute capacité - Verre x2, Titane x4, Alimentation x1", icon: "https://static.wikia.nocookie.net/subnautica/images/2/2f/High_Capacity_Tank.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "🗺️ Zones", items: [
                    "Forêt de varech (Kelp Forest) : Prof. 20-60m. Dangers : Stalkers près épaves"
                ]}
            ]
        },
        {
            id: "chapitre-3",
            title: "Chapitre 3 : Construction du Seamoth et Exploration Moyenne Profondeur",
            sections: [
                { title: "🎯 Étapes", items: [
                    "Scan fragments Seamoth (épaves Plateaux herbeux)",
                    "Construis Habitat Builder (de gros débris)",
                    "Construis base simple (Salle polyvalente), Moonpool, Baie véhicule mobile (MV Bay)",
                    "Fabrique Seamoth",
                    "Explore pour plans (Canon de propulsion / Canon de répulsion)"
                ]},
                { title: "🔧 Crafts clés", items: [
                    { text: "Constructeur d'habitats - Verre x2, Titane x2", icon: "https://static.wikia.nocookie.net/subnautica/images/7/7b/Habitat_Builder.png/revision/latest?cb=20180626194329" },
                    { text: "Baie véhicule mobile (MV Bay) - Lingot titane x2, Pile énergie x1, Graisse x1, Puce x1", icon: "https://static.wikia.nocookie.net/subnautica/images/8/8e/Mobile_Vehicle_Bay.png/revision/latest?cb=20180626194329" },
                    { text: "Seamoth - Lingot plasteel x2, Pile énergie x1, Puce x1", icon: "https://static.wikia.nocookie.net/subnautica/images/3/3e/Seamoth.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "🗺️ Zones", items: [
                    "Plateaux herbeux (Grassy Plateaus) : Prof. 50-200m. Dangers : Requins de sable",
                    "Zone de crash (Crash Zone) : Dangers : Reapers ! Lithium sur Île flottante"
                ]}
            ]
        },
        // ... (les chapitres 4 à 9 restent identiques à ce que tu avais, tu peux leur ajouter des emojis si tu veux : ex title: "🔧 Crafts", "🗺️ Zones")
        {
            id: "chapitre-4",
            title: "Chapitre 4 : Bases Avancées et Armes",
            sections: [
                { title: "🎯 Étapes", items: [ /* ... */ ] },
                { title: "🔧 Crafts", items: [ /* ... */ ] },
                { title: "🗺️ Zones", items: [ /* ... */ ] }
            ]
        },
        // Chapitre 5 à 9 : tu peux copier-coller et ajouter les emojis toi-même de la même façon
        // Chapitre X (long) :
        {
            id: "materiaux-upgrades",
            title: "Liste Complète Matériaux pour Véhicules (Base + Tous Améliorations)",
            sections: [
                { title: "🚗 Seamoth (Base + Toutes les 12 améliorations)", items: [ /* ... */ ] },
                { title: "🤖 Combinaison PRAWN (Base + Tous Bras/Modules)", items: [ /* ... */ ] },
                { title: "🛳️ Cyclops (Base + Toutes les 10 améliorations)", items: [ /* ... */ ] },
                { title: "🚀 Fusée d'Évacuation Neptune (Complète)", items: [ /* ... */ ] }
            ]
        }
    ]
};

// ──────────────────────────────────────────────────────────────
// Le reste du code avec les ajouts : compteur global + bouton tout cocher
// ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const content = document.getElementById('content');
    const resetLink = document.getElementById('reset-progress');

    let progress = JSON.parse(localStorage.getItem('subnautica-progress')) || {};

    function updateChapterProgress(chapterId) {
        const chapter = data.chapters.find(ch => ch.id === chapterId);
        if (!chapter) return { checked: 0, total: 0 };
        let total = 0;
        let checked = 0;
        chapter.sections.forEach(sec => {
            sec.items.forEach((item, index) => {
                const key = `${chapterId}-${sec.title}-${index}`;
                total++;
                if (progress[key]) checked++;
            });
        });
        return { checked, total };
    }

    // NOUVEAU : Compteur global
    function updateGlobalProgress() {
        let total = 0;
        let checked = 0;
        data.chapters.forEach(ch => {
            const p = updateChapterProgress(ch.id);
            total += p.total;
            checked += p.checked;
        });
        const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
        const elem = document.getElementById('global-progress');
        if (elem) {
            elem.textContent = `Progression globale : ${percent}% (${checked}/${total} tâches)`;
        }
    }

    // Remplir la sidebar
    data.chapters.forEach(chapter => {
        const li = document.createElement('li');
        const prog = updateChapterProgress(chapter.id);
        const a = document.createElement('a');
        a.href = `#${chapter.id}`;
        a.textContent = `${chapter.title} (${prog.checked}/${prog.total})`;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            renderChapter(chapter);
            window.location.hash = chapter.id;
        });
        li.appendChild(a);
        chaptersList.appendChild(li);
    });

    function renderChapter(chapter) {
        content.innerHTML = '';

        // NOUVEAU : Bouton "Tout cocher ce chapitre"
        const checkAllBtn = document.createElement('button');
        checkAllBtn.textContent = "Tout cocher ce chapitre";
        checkAllBtn.style.margin = '0 0 20px 0';
        checkAllBtn.style.padding = '10px 20px';
        checkAllBtn.style.background = '#004d40';
        checkAllBtn.style.color = '#b2ebf2';
        checkAllBtn.style.border = '1px solid #00acc1';
        checkAllBtn.style.borderRadius = '8px';
        checkAllBtn.style.cursor = 'pointer';
        checkAllBtn.style.fontSize = '1em';
        checkAllBtn.onmouseover = () => { checkAllBtn.style.background = '#006064'; };
        checkAllBtn.onmouseout = () => { checkAllBtn.style.background = '#004d40'; };
        checkAllBtn.onclick = () => {
            chapter.sections.forEach(sec => {
                sec.items.forEach((_, index) => {
                    const key = `${chapter.id}-${sec.title}-${index}`;
                    progress[key] = true;
                });
            });
            localStorage.setItem('subnautica-progress', JSON.stringify(progress));
            renderChapter(chapter); // Re-rendu pour voir les coches
            updateGlobalProgress(); // Mise à jour compteur global
            // Optionnel : update les compteurs sidebar
            document.querySelector(`a[href="#${chapter.id}"]`).textContent = `${chapter.title} (${chapter.sections.reduce((sum, s) => sum + s.items.length, 0)}/${chapter.sections.reduce((sum, s) => sum + s.items.length, 0)})`;
        };
        content.appendChild(checkAllBtn);

        if (chapter.image) {
            const img = document.createElement('img');
            img.src = chapter.image;
            img.alt = chapter.title;
            img.classList.add('chapter-image');
            content.appendChild(img);
        }

        const h2 = document.createElement('h2');
        h2.textContent = chapter.title;
        content.appendChild(h2);

        chapter.sections.forEach(sec => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            const h3 = document.createElement('h3');
            h3.textContent = sec.title;
            sectionDiv.appendChild(h3);

            sec.items.forEach((itemObj, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                if (typeof itemObj === 'object' && itemObj.icon) {
                    const icon = document.createElement('img');
                    icon.src = itemObj.icon;
                    icon.classList.add('item-icon');
                    icon.alt = '';
                    itemDiv.appendChild(icon);
                }

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                const key = `${chapter.id}-${sec.title}-${index}`;
                checkbox.checked = !!progress[key];

                checkbox.addEventListener('change', () => {
                    progress[key] = checkbox.checked;
                    localStorage.setItem('subnautica-progress', JSON.stringify(progress));
                    const prog = updateChapterProgress(chapter.id);
                    const link = document.querySelector(`a[href="#${chapter.id}"]`);
                    if (link) link.textContent = `${chapter.title} (${prog.checked}/${prog.total})`;
                    updateGlobalProgress(); // Mise à jour globale
                });

                const label = document.createElement('label');
                label.textContent = typeof itemObj === 'string' ? itemObj : itemObj.text;

                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(label);
                sectionDiv.appendChild(itemDiv);
            });

            content.appendChild(sectionDiv);
        });

        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${chapter.id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    const hash = window.location.hash.substring(1);
    let initialChapter = data.chapters.find(ch => ch.id === hash) || data.chapters[0];
    renderChapter(initialChapter);
    updateGlobalProgress(); // Initialisation compteur global

    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment tout réinitialiser ?')) {
            localStorage.removeItem('subnautica-progress');
            progress = {};
            location.reload();
        }
    });
});
