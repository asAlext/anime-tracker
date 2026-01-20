// Données de la checklist pour Subnautica - Version COMPLÈTE avec 10 chapitres
const data = {
    chapters: [
        {
            id: "chapitre-1",
            title: "Chapitre 1 : Le Crash et la Survie Initiale",
            image: "https://static.wikia.nocookie.net/subnautica/images/0/0a/Safe_Shallows_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Objectif & Étapes détaillées", items: [
                    "Éteins l'incendie (Extincteur du conteneur)",
                    "Scanner tout (PDA auto-guide)",
                    "Répare les systèmes (Repair Tool : scan Titanium près capsule)",
                    "Hydrate-toi (Bouteilles d'eau du conteneur), mange Blocs de nutriments si urgence",
                    "Explore autour : récolte Minerai de titane, Minerai de cuivre, Quartz, Minerai d'argent, Affleurements calcaires (pour Caoutchouc de silicone, Champignons acides)",
                    "Répare Fabricator de kits médicaux (gratuit, +50 PV)"
                ]},
                { title: "Crafts essentiels (Fabricator de la capsule)", items: [
                    { text: "Outil de réparation - Silice x1, Caviar de Crushfish x2", icon: "https://static.wikia.nocookie.net/subnautica/images/5/5e/Repair_Tool.png/revision/latest?cb=20180626194329" },
                    { text: "Couteau de survie - Silice x2", icon: "https://static.wikia.nocookie.net/subnautica/images/3/3a/Survival_Knife.png/revision/latest?cb=20180626194329" },
                    { text: "Palmes - Silice x2", icon: "https://static.wikia.nocookie.net/subnautica/images/4/4e/Fins.png/revision/latest?cb=20180626194329" },
                    { text: "Lampe torche - Silice x1, Lingot de titane x1, Batterie x1", icon: "https://static.wikia.nocookie.net/subnautica/images/7/7e/Flashlight.png/revision/latest?cb=20180626194329" },
                    { text: "Scanner - Lingot de titane x2", icon: "https://static.wikia.nocookie.net/subnautica/images/6/6f/Scanner.png/revision/latest?cb=20180626194329" },
                    { text: "Réservoir O2 standard - Silice x2, Titane x2", icon: "https://static.wikia.nocookie.net/subnautica/images/9/9d/Oxygen_Tank.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "Zones à explorer", items: [
                    "Bancs calmes (Safe Shallows) : Prof. 0-30m. Ressources abondantes, dangers : aucun"
                ]}
            ]
        },
        {
            id: "chapitre-2",
            title: "Chapitre 2 : Premiers Outils Avancés et Signaux de Détresse",
            image: "https://static.wikia.nocookie.net/subnautica/images/9/9e/Kelp_Forest_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes détaillées", items: [
                    "Répare radio (Fabricator + énergie solaire)",
                    "Lance signal de détresse, écoute réponses (capsules de survie 3,6,7,12,13,17,19)",
                    "Explore capsules pour plans (ex: capsule 3 = Seaglide, capsule 19 = Canon de propulsion)",
                    "Récolte Champignons saignants pour Eau filtrée",
                    "Explore épaves pour fragments (Coupeur laser)"
                ]},
                { title: "Crafts", items: [
                    { text: "Eau filtrée - Morceaux de Bleeder x1", icon: "https://static.wikia.nocookie.net/subnautica/images/1/1b/Filter_Water.png/revision/latest?cb=20180626194329" },
                    { text: "Seaglide - Lingot titane x2, Lubrifiant x1, Batterie x3", icon: "https://static.wikia.nocookie.net/subnautica/images/3/3e/Seaglide.png/revision/latest?cb=20180626194329" },
                    { text: "Coupeur laser - Diamant x1, Lingot titane x2, Verre x2", icon: "https://static.wikia.nocookie.net/subnautica/images/4/4d/Laser_Cutter.png/revision/latest?cb=20180626194329" },
                    { text: "Réservoir O2 haute capacité - Verre x2, Titane x4, Alimentation x1", icon: "https://static.wikia.nocookie.net/subnautica/images/2/2f/High_Capacity_Tank.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "Zones", items: [
                    "Forêt de varech (Kelp Forest) : Prof. 20-60m. Dangers : Stalkers près épaves"
                ]}
            ]
        },
        {
            id: "chapitre-3",
            title: "Chapitre 3 : Construction du Seamoth et Exploration Moyenne Profondeur",
            image: "https://static.wikia.nocookie.net/subnautica/images/5/5a/Grassy_Plateaus_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "Scan fragments Seamoth (épaves Plateaux herbeux)",
                    "Construis Habitat Builder (de gros débris)",
                    "Construis base simple (Salle polyvalente), Moonpool, Baie véhicule mobile (MV Bay)",
                    "Fabrique Seamoth",
                    "Explore pour plans (Canon de propulsion / Canon de répulsion)"
                ]},
                { title: "Crafts clés", items: [
                    { text: "Constructeur d'habitats - Verre x2, Titane x2", icon: "https://static.wikia.nocookie.net/subnautica/images/7/7b/Habitat_Builder.png/revision/latest?cb=20180626194329" },
                    { text: "Baie véhicule mobile (MV Bay) - Lingot titane x2, Pile énergie x1, Graisse x1, Puce x1", icon: "https://static.wikia.nocookie.net/subnautica/images/8/8e/Mobile_Vehicle_Bay.png/revision/latest?cb=20180626194329" },
                    { text: "Seamoth - Lingot plasteel x2, Pile énergie x1, Puce x1", icon: "https://static.wikia.nocookie.net/subnautica/images/3/3e/Seamoth.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "Zones", items: [
                    "Plateaux herbeux (Grassy Plateaus) : Prof. 50-200m. Dangers : Requins de sable",
                    "Zone de crash (Crash Zone) : Dangers : Reapers ! Lithium sur Île flottante"
                ]}
            ]
        },
        {
            id: "chapitre-4",
            title: "Chapitre 4 : Bases Avancées et Armes",
            image: "https://static.wikia.nocookie.net/subnautica/images/3/3f/Mushroom_Forest_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "Base en Plateaux/Champignons : Salle polyvalente x2+, Fabricator, Batteries",
                    "Salle scanner + modules (HUD ressources)",
                    "Canon de propulsion pour pousser objets/leurres",
                    "Explore Aurora (code 2679 pour Quartiers du Capitaine)"
                ]},
                { title: "Crafts", items: [
                    { text: "Salle scanner - Verre x3, Titane x3", icon: "https://static.wikia.nocookie.net/subnautica/images/1/1e/Scanner_Room.png/revision/latest?cb=20180626194329" },
                    { text: "Canon propulsion - Titane x3, Pile x1, Piston x1", icon: "https://static.wikia.nocookie.net/subnautica/images/5/5d/Propulsion_Cannon.png/revision/latest?cb=20180626194329" },
                    { text: "Canon répulsion - Titane x2, Pile x1, Aimant x3", icon: "https://static.wikia.nocookie.net/subnautica/images/7/7a/Repulsion_Cannon.png/revision/latest?cb=20180626194329" }
                ]},
                { title: "Zones", items: [
                    "Forêt de champignons (Mushroom Forest) : Prof. 100-300m",
                    "Aurora : Radioactif (armure anti-radiation). Plans PRAWN/Cyclops"
                ]}
            ]
        },
        {
            id: "chapitre-5",
            title: "Chapitre 5 : Construction Combinaison PRAWN",
            image: "https://static.wikia.nocookie.net/subnautica/images/4/4e/Grand_Reef_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "Plan Aurora Abordage 2/2",
                    "Rubis (Évents thermiques), Sac de gel (Grottes Jellyshroom)",
                    "Fragments bras (Grand Récif Profond)"
                ]},
                { title: "Zones", items: [
                    "Grand Récif (Grand Reef) : Prof. 200-500m. Dangers : Crabsquid, Sea Treader"
                ]}
            ]
        },
        {
            id: "chapitre-6",
            title: "Chapitre 6 : Construction Cyclops et Exploration Zone des Bulbes",
            image: "https://static.wikia.nocookie.net/subnautica/images/2/2e/Bulb_Zone_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "Scan 9 fragments (Champignons, Zone crash, etc.)",
                    "Construis Cyclops (Baie véhicule mobile)",
                    "Améliorations Cyclops (profondeur jusqu'à 1700m)"
                ]},
                { title: "Zones", items: [
                    "Zone des bulbes (Bulb Zone) : Prof. 300-500m. Ressources : Nickel"
                ]}
            ]
        },
        {
            id: "chapitre-7",
            title: "Chapitre 7 : Profondeurs Fatales - Rivière Perdue et Lave",
            image: "https://static.wikia.nocookie.net/subnautica/images/1/1d/Lost_River_Biome.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "PRAWN profondeur MK2/3 (Kyanite)",
                    "Explore Rivière perdue (Léviathans fantômes)",
                    "Active Arches aliens (tablettes orange/violette)"
                ]},
                { title: "Zones", items: [
                    "Rivière perdue (Lost River) : Prof. 500-1100m. Dangers : Léviathans fantômes",
                    "Lacs de lave (Lava Lakes) : Prof. 1300-1700m. Dangers : Dragons de mer !"
                ]}
            ]
        },
        {
            id: "chapitre-8",
            title: "Chapitre 8 : Bases Aliens et Guérison",
            image: "https://static.wikia.nocookie.net/subnautica/images/8/8f/Primary_Containment_Facility.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "Installation de recherche sur les maladies (tablette bleue)",
                    "Installation de confinement principal (incubation œufs Empereur de mer)",
                    "Guérison Kharaa"
                ]},
                { title: "Zones", items: [
                    "Installation de confinement principal : Prof. 1400m"
                ]}
            ]
        },
        {
            id: "chapitre-9",
            title: "Chapitre 9 : Désactivation Canon et Évasion",
            image: "https://static.wikia.nocookie.net/subnautica/images/5/5d/Aurora_Crashed.png/revision/latest?cb=20180726192315",
            sections: [
                { title: "Étapes", items: [
                    "Désactive Plateforme de quarantaine (Cellule ionique)",
                    "Plan Fusée (Quartiers Capitaine Aurora)",
                    "Construis sur surface"
                ]},
                { title: "Zones", items: [
                    "Surface (Île flottante sûre)"
                ]},
                { title: "Fin du jeu", items: [
                    "Lance fusée après guérison. Félicitations ! Explore 100% pour bases Degasi, Précurseurs"
                ]}
            ]
        },
        {
            id: "materiaux-upgrades",
            title: "Chapitre X : Liste Complète Matériaux pour Véhicules (Base + Tous Améliorations)",
            image: "https://static.wikia.nocookie.net/subnautica/images/3/3e/Seamoth.png/revision/latest?cb=20180626194329",
            sections: [
                { title: "Seamoth (Base + Toutes les 12 améliorations)", items: [
                    "Base : Lingot plasteel x2, Pile énergie x1, Puce électronique x1",
                    "Ressources brutes approx. (base) : Minerai de titane x20+, Cuivre x10, Argent x5, Or x2, Plomb x8",
                    "Profondeur MK1 - Plasteel x1, Puce x1, Kit câblage x1",
                    "Profondeur MK2 - Plasteel x1, Puce x1, Magnétite x2",
                    "Profondeur MK3 - Plasteel x1, Puce x1, Kyanite x2",
                    "Brut total approx. (tous) : Minerai de titane x100+, Nickel x20, Kyanite x10, etc."
                ]},
                { title: "Combinaison PRAWN (Base + Tous Bras/Modules)", items: [
                    "Base : Lingot plasteel x2, Pile énergie x1, Puce électronique x1, Verre émaillé x1, Aérogel x2",
                    "Brut base : Titane x30, Rubis x4, Sac de gel x4",
                    "Bras forage - Plasteel x2, Moteur x2",
                    "Profondeur MK2 - Plasteel x1, Kyanite x4",
                    "Brut total : Titane x80+, Kyanite x20, Rubis x10"
                ]},
                { title: "Cyclops (Base + Toutes les 10 améliorations)", items: [
                    "Base : Lingot plasteel x4, Pile énergie x2, Puce électronique x2, Graisse x1, Verre renforcé x4",
                    "Brut base : Titane x50+, Quartz x20",
                    "Profondeur MK3 - Plasteel x1 + Kyanite x2",
                    "Brut total : Titane x100+, Kyanite x10, Cubes ion x5"
                ]},
                { title: "Fusée d'Évacuation Neptune (Complète)", items: [
                    "Toutes pièces : Lanceur, Gantry, Boosters Ion, Réserve carburant, Cockpit",
                    "Matériaux agrégés : Fibre carbone x2, Puce électronique x3, Pile ionique x1, Kyanite x60, etc.",
                    "Brut total : Minerai de titane x100+, Kyanite x60 (Lave), Uranium x2 (Rivière perdue)"
                ]}
            ]
        }
    ]
};

// Le reste du code (progression, render, highlight, reset) - identique à ta version
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

    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment tout réinitialiser ?')) {
            localStorage.removeItem('subnautica-progress');
            progress = {};
            location.reload();
        }
    });
});
