export interface ProjectData {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    objective: string;
    audience: string;
    impact: string;
    partnership?: string;
    category: string;
    status: 'active' | 'completed' | 'phase';
    statusLabel: string;
    progress: number;
    color: string;
    imageDir: string;
    imageCount: number;
    coverImage?: string;
}

/** Generate image paths for a project using rose-winarouz-N.jpg convention */
function generateImages(dir: string, count: number): string[] {
    return Array.from({ length: count }, (_, i) => `${dir}/rose-winarouz-${i + 1}.jpg`);
}

export const projectsData: ProjectData[] = [
    {
        slug: 'reconstruction',
        title: 'Reconstruction communautaire post-séisme – Douar IRZ, Commune d\'Asni',
        shortTitle: 'Reconstruction communautaire',
        description: 'Ce projet vise la reconstruction et la réhabilitation d\'infrastructures communautaires essentielles après le séisme dans le douar IRZ, commune d\'Asni. Il a pour objectif de restaurer des espaces collectifs sûrs et fonctionnels afin de renforcer la résilience locale.',
        objective: 'Contribuer à la reconstruction territoriale et à la cohésion sociale post-séisme.',
        audience: 'Habitants du douar IRZ (familles, femmes, enfants).',
        impact: 'Amélioration des conditions de vie, restauration du lien communautaire et renforcement du sentiment de sécurité collective.',
        partnership: 'En collaboration avec les partenaires locaux et la communauté.',
        category: 'Infrastructure',
        status: 'active',
        statusLabel: 'En cours',
        progress: 72,
        color: '#8B6914',
        imageDir: '/project images/reconstruction',
        imageCount: 20,
    },
    {
        slug: 'prescolaire',
        title: 'Construction d\'infrastructures éducatives préscolaires – Douar Ouasaft & Douar IRZ',
        shortTitle: 'Infrastructures préscolaires',
        description: 'Construction de deux établissements préscolaires dans des zones rurales touchées par le séisme, afin de garantir l\'accès à une éducation de base de qualité pour les jeunes enfants.',
        objective: 'Favoriser l\'accès équitable à l\'éducation dès le plus jeune âge en milieu rural.',
        audience: 'Enfants en âge préscolaire et leurs familles.',
        impact: 'Accès durable à l\'éducation, réduction des inégalités territoriales et soutien à la scolarisation en zones isolées.',
        partnership: 'En collaboration avec Human Rights Fund.',
        category: 'Éducation',
        status: 'active',
        statusLabel: 'En cours',
        progress: 58,
        color: '#1A3A5C',
        imageDir: '/project images/prescolaire',
        imageCount: 8,
        coverImage: '/project images/prescolaire/rose-winarouz-3.jpg',
    },
    {
        slug: 'orientation',
        title: 'Orientation scolaire et professionnelle des jeunes d\'El Haouz',
        shortTitle: 'Orientation des jeunes',
        description: 'Un programme d\'accompagnement destiné aux jeunes pour les aider à mieux définir leurs parcours scolaires, professionnels et citoyens, à travers des ateliers d\'orientation, d\'information et de sensibilisation.',
        objective: 'Renforcer l\'autonomie, l\'employabilité et la projection professionnelle des jeunes ruraux.',
        audience: 'Jeunes filles et garçons de la province d\'El Haouz.',
        impact: 'Meilleure orientation des parcours, renforcement de la motivation scolaire et ouverture vers les opportunités nationales et internationales.',
        partnership: 'En collaboration avec l\'Union européenne.',
        category: 'Éducation',
        status: 'phase',
        statusLabel: 'Phase 2',
        progress: 45,
        color: '#2C5F7C',
        imageDir: '/project images/orientation',
        imageCount: 27,
    },
    {
        slug: 'ira',
        title: 'IRA – Renforcement du tissu associatif à El Haouz',
        shortTitle: 'Renforcement associatif',
        description: 'Le projet IRA vise à renforcer les capacités organisationnelles, stratégiques et opérationnelles des associations locales afin d\'améliorer leur impact et leur durabilité.',
        objective: 'Professionnaliser les acteurs de la société civile locale et renforcer la gouvernance associative.',
        audience: 'Associations et acteurs locaux d\'El Haouz.',
        impact: 'Amélioration de la gestion associative, meilleure structuration des projets et montée en compétences des acteurs locaux.',
        partnership: 'En collaboration avec la Fondation de France.',
        category: 'Autonomisation',
        status: 'completed',
        statusLabel: 'Achevé',
        progress: 100,
        color: '#136207',
        imageDir: '/project images/ira',
        imageCount: 30,
    },
    {
        slug: 'sante',
        title: 'Ana w Saḥti – Santé sexuelle et reproductive',
        shortTitle: 'Santé sexuelle et reproductive',
        description: 'Projet de sensibilisation et d\'éducation à la santé sexuelle et reproductive, intégrant une approche culturelle, communautaire et inclusive adaptée au contexte rural.',
        objective: 'Améliorer les connaissances et les pratiques en matière de santé sexuelle, reproductive et d\'hygiène.',
        audience: 'Femmes et hommes des zones rurales d\'El Haouz.',
        impact: 'Renforcement de l\'accès à l\'information, amélioration du bien-être et réduction des tabous liés à la santé.',
        partnership: 'En collaboration avec la Fondation de France.',
        category: 'Santé',
        status: 'active',
        statusLabel: 'En cours',
        progress: 65,
        color: '#7C2C3E',
        imageDir: '/project images/sante',
        imageCount: 19,
    },
    {
        slug: 'secours',
        title: 'Formation aux gestes de premiers secours',
        shortTitle: 'Premiers secours',
        description: 'Programme de formation pratique aux gestes de premiers secours, destiné à renforcer les capacités locales de réponse face aux situations d\'urgence, particulièrement en contexte post-catastrophe.',
        objective: 'Renforcer la résilience communautaire et la prévention des risques.',
        audience: 'Femmes et hommes des douars d\'El Haouz.',
        impact: 'Autonomisation des bénéficiaires, amélioration de la sécurité communautaire et réduction des risques sanitaires.',
        partnership: 'En collaboration avec la Fondation de France.',
        category: 'Santé',
        status: 'completed',
        statusLabel: 'Achevé',
        progress: 100,
        color: '#6B4C8A',
        imageDir: '/project images/secours',
        imageCount: 23,
    },
    {
        slug: 'entrepreneuriat',
        title: 'Entrepreneuriat social et développement économique local',
        shortTitle: 'Entrepreneuriat social',
        description: 'Un projet visant à accompagner les porteurs de projets et initiatives locales dans le développement d\'activités économiques durables à fort impact social.',
        objective: 'Stimuler l\'économie locale et promouvoir l\'entrepreneuriat social en milieu rural.',
        audience: 'Jeunes, femmes et porteurs de projets locaux.',
        impact: 'Création d\'activités génératrices de revenus, renforcement de l\'autonomie économique et valorisation des ressources territoriales.',
        partnership: 'En collaboration avec IECD.',
        category: 'Autonomisation',
        status: 'active',
        statusLabel: 'En cours',
        progress: 34,
        color: '#3A6B4E',
        imageDir: '/project images/entrepreneuriat',
        imageCount: 11,
    },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
    return projectsData.find(p => p.slug === slug);
}

export function getProjectImages(project: ProjectData): string[] {
    return generateImages(project.imageDir, project.imageCount);
}
