// Données de la checklist pour Subnautica - Version COMPLÈTE avec 8 chapitres chronologiques précis
const data = {
    chapters: [
        {
            id: "chapitre-1",
            title: "Chapitre 1 : Le Crash et la Survie Initiale (Profondeur : 0-50 m, Biomes : Détroits sûrs)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Éteins le feu dans la capsule avec l'extincteur",
                    "Répare la radio et les systèmes secondaires de la capsule (Outil de réparation)",
                    "Gère la faim/soif/O₂ : pêche Poisson-vessie/Peeper, cuisiner, purifier l'eau",
                    "Scanner la faune/flore basique et les fragments initiaux",
                    "Réponds aux premiers signaux radio (Capsule de survie 3 à proximité)"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Autour de la capsule : affleurements calcaires (Minerai de titane/Cuivre), grottes sous la capsule (Soufre)",
                    "Capsule de survie 3 (-30, -20, 410) pour fragments Propulseur et Boussole"
                ]},
                { title: "🔧 À crafter (Fabricateur de la capsule)", items: [
                    "Réservoir d'oxygène standard (+30 s d'air)",
                    "Outil de réparation",
                    "Trousse de premiers soins (Générateur médical)",
                    "Ailerons (+15 % vitesse de nage)",
                    "Lampe torche",
                    "Scanner",
                    "Couteau de survie",
                    "Vessie d'air, Fusées éclairantes"
                ]}
            ]
        },
        {
            id: "chapitre-2",
            title: "Chapitre 2 : Outils Essentiels et Mobilité de Base (Profondeur : 50-150 m, Biomes : Forêt de varech, Plateaux herbeux)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Explore les grottes pour Soufre/Goop acide",
                    "Réponds aux signaux : Capsule de survie 17 (-515, -95, 55) pour fragments Seamoth/Bioréacteur",
                    "Scanner les fragments dans les débris (ex. Gros Débris #1 : 65, -30, 385 pour Découpeur laser)",
                    "Collecte Minerai d'argent (affleurements de grès), Minerai de lithium (Schiste)"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Forêt de varech : débris petits/gros pour Propulseur, fragments base",
                    "Plateaux herbeux : épaves pour Seamoth (Très Gros Débris #1 : -120, -180, 860)",
                    "Capsule de survie 6 (360, 110, 310) pour Ailerons ultra glissants"
                ]},
                { title: "🔧 À crafter", items: [
                    "Propulseur (mobilité rapide)",
                    "Boussole",
                    "Constructeur d'habitat",
                    "Compartiments d'habitat basiques : Ordinateur de base, Lit, Chargeur de batteries",
                    "Seamoth (après fragments)"
                ]}
            ]
        },
        {
            id: "chapitre-3",
            title: "Chapitre 3 : Première Base et Île du Sunbeam (Profondeur : 0-200 m, Biomes : Détroits sûrs, Île flottante)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Choisis un spot pour la base (ex. -830, -190, 835 près du titane)",
                    "Réponds à l'appel du Sunbeam : arrive en <30 min",
                    "Explore l'île : graines d'arbres bulbeux (nourriture/eau), schiste (lithium/or/diamant)",
                    "Entre dans les grottes de l'île : sel des dépôts, tablettes violettes (x3)",
                    "Plateforme d'exécution de la quarantaine : insère les tablettes violettes, scanne le canon alien, cubes ioniques, active l'arche (téléporteur)"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Île du Sunbeam (275, 0, 1090)",
                    "Grottes sous l'île : première (340, 10, 1030), seconde (360, 120, 1150)",
                    "Bâtiment alien (390, 5, 1120)"
                ]},
                { title: "🔧 À crafter", items: [
                    "Baie de véhicules mobiles",
                    "Bassin lunaire",
                    "Combinaison radiologique (Zinc/Fibres de corail)",
                    "Salle polyvalente, Salle de scanner (débloqués via fragments)"
                ]}
            ]
        },
        {
            id: "chapitre-4",
            title: "Chapitre 4 : Abordage de l'Aurora - Extérieur et Baies (Profondeur : 100-300 m, Biomes : Récifs clairsemés)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Approche l'Aurora par l'arrière gauche",
                    "Éteins les incendies, répare les câblages, tue les Rampants des grottes",
                    "Explore les sédiments : capsules de données temporaires (Bras foreuse PRAWN, Barres de réacteur)",
                    "Baie de cargaison 3 (code 1454) : trousses médicales",
                    "Baie à Seamoth : scanner Module de profondeur MK1"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Extérieur de l'Aurora (470, -5, -310)",
                    "Entrée frontale (1150, 2, 112)",
                    "Salle des machines : répare 11 brèches"
                ]},
                { title: "🔧 À crafter", items: [
                    "Extincteurs (Titane)",
                    "Canon de propulsion (fragments)",
                    "Recycleur (Silice/Titane)"
                ]}
            ]
        },
        {
            id: "chapitre-5",
            title: "Chapitre 5 : Abordage de l'Aurora - Intérieur et Quartiers (Profondeur : 100-300 m, Biomes : Zone de crash de l'Aurora)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Bureau d'administration : télécharge les données, scanne les posters",
                    "Quartiers d'habitation : éteins les feux, scanne les tables bar/chaises",
                    "Cabines (codes : 1869 cabine 1, 2679 capitaine, 6483 échantillons) : bagages, eau",
                    "Baie à PRAWN : scanne les combinaisons",
                    "Salle du cœur : coupe les portes (Découpeur laser), PDA/code 6483"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Pont supérieur, Ponts résidentiels",
                    "Baie à PRAWN"
                ]},
                { title: "🔧 À crafter", items: [
                    "Station de modification (fragments)",
                    "Cyclops (fragments moteurs Aurora/débris)",
                    "Modules de profondeur MK1/MK2 Seamoth/Cyclops"
                ]}
            ]
        },
        {
            id: "chapitre-6",
            title: "Chapitre 6 : Grotte des champignons-gélifiés et Base Degasi (Profondeur : 200-600 m, Biomes : Grotte des champignons-gélifiés, Grand récif)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Mine le lithium/or/magnétite (Bras foreuse PRAWN)",
                    "Explore la base Degasi : scanne Salle polyvalente/Observatoire",
                    "Collecte les œufs de créatures, photos, lits",
                    "Réponds aux signaux des capsules profondes (ex. Capsule de survie 19 : réservoir haute capacité)"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Grotte des champignons-gélifiés (-370, -90, -160)",
                    "Base Degasi (-650, -503, -950)"
                ]},
                { title: "🔧 À crafter", items: [
                    "Combinaison PRAWN (fragments Aurora)",
                    "Bras PRAWN : Foreuse, Grappin",
                    "Centrale thermique, Chargeur de batteries avancé"
                ]}
            ]
        },
        {
            id: "chapitre-7",
            title: "Chapitre 7 : Structures Alien Profondes (Profondeur : 700-1400 m, Biomes : Rivière perdue, Champ des os, Installation de recherche sur les maladies, Centrale thermique)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Champ des os : eau acide, tablettes orange/violettes, scanne fossiles/œufs",
                    "Installation de recherche sur les maladies : scanne les Warpers, infection Kharaa révélée",
                    "Centrale thermique : mine Kyanite/cubes ioniques, active le téléporteur Sunbeam",
                    "Désactive les champs de force (tablettes)"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Champ des os (-710, -710, -710)",
                    "Installation de recherche sur les maladies (-240, -795, 310)",
                    "Centrale thermique (-70, -1180, 10)"
                ]},
                { title: "🔧 À crafter", items: [
                    "Modules de profondeur MK3 (Kyanite)",
                    "Fusil de stase (fragments)",
                    "Piles ioniques",
                    "Bras découpeur laser PRAWN"
                ]}
            ]
        },
        {
            id: "chapitre-8",
            title: "Chapitre 8 : Installation de confinement, Guérison et Évasion (Profondeur : 1400-1700 m, Biomes : Lacs de lave, Château de lave)",
            sections: [
                { title: "🎯 À faire / Étapes détaillées", items: [
                    "Mine les gros nœuds de Kyanite",
                    "Installation de confinement primaire : scanne expositions/œufs/fœtus, interagit avec l'Empereur des mers (confiance)",
                    "Incube l'Enzyme 42 (guérison), désactive le canon alien",
                    "Récupère le plan de la Fusée Neptune (terminal Aurora)",
                    "Construis/Active la fusée : plateforme, rampe, propulseurs, réservoir carburant, cockpit ; active les modules (énergie, comms, hydraulique)"
                ]},
                { title: "🗺️ À visiter", items: [
                    "Installation de confinement primaire (220, -1451, -260)",
                    "Aquarium de l'Empereur"
                ]},
                { title: "🔧 À crafter", items: [
                    "Enzymes d'incubation",
                    "Composants de la Fusée Neptune",
                    "Base finale : Salle polyvalente, Réacteur nucléaire si besoin"
                ]}
            ]
        }
    ]
};

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

        const checkAllBtn = document.createElement('button');
        checkAllBtn.textContent = "Tout cocher ce chapitre";
        checkAllBtn.style.margin = '0 0 20px 0';
        checkAllBtn.style.padding = '10px 20px';
        checkAllBtn.style.background = '#004d40';
        checkAllBtn.style.color = '#b2ebf2';
        checkAllBtn.style.border = '1px solid #00acc1';
        checkAllBtn.style.borderRadius = '8px';
        checkAllBtn.style.cursor = 'pointer';
        checkAllBtn.onclick = () => {
            chapter.sections.forEach(sec => {
                sec.items.forEach((_, index) => {
                    const key = `${chapter.id}-${sec.title}-${index}`;
                    progress[key] = true;
                });
            });
            localStorage.setItem('subnautica-progress', JSON.stringify(progress));
            renderChapter(chapter);
            updateGlobalProgress();
            const link = document.querySelector(`a[href="#${chapter.id}"]`);
            if (link) {
                const prog = updateChapterProgress(chapter.id);
                link.textContent = `${chapter.title} (${prog.checked}/${prog.total})`;
            }
        };
        content.appendChild(checkAllBtn);

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

                // Pas d'icône ici pour éviter les problèmes
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
                    updateGlobalProgress();
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
    updateGlobalProgress();

    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment tout réinitialiser ?')) {
            localStorage.removeItem('subnautica-progress');
            progress = {};
            location.reload();
        }
    });
});
