export type JournalArticle = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    author: string;
    imageCover: string;
    pdfUrl?: string;
};

export const journalData: JournalArticle[] = [
    {
        id: '1',
        slug: 'entrepreneur-citoyen',
        title: "Le concept de l'entrepreneur citoyen",
        excerpt: "La responsabilité des dirigeants entrepreneurs n'est plus limitée à la recherche du profit, l'intégration d'objectifs sociaux et humains devient essentielle.",
        content: `De nos jours, la responsabilité des dirigeants entrepreneurs n'est plus limitée à la recherche du profit. L'attitude vis-à-vis de l'environnement naturel, humain, et social est à prendre en compte. La réputation des entrepreneurs dans ces domaines est même devenue un atout de compétition.

Le concept de l'entrepreneur citoyen est devenu, ces dernières années, l'un des thèmes phares de plusieurs disciplines de la littérature managériale. Ce concept correspondrait à l'intégration par l'entrepreneur d'objectifs sociaux, sociétaux et humains en plus de ceux économiques.

Prise en compte sous cet angle, l'entrepreneur citoyen apparaît comme une concrétisation de l'intégration de repères éthiques dans le domaine de l'entreprise (Sautré, 2003) qui semblait voué à être régi uniquement par la logique du profit. On peut alors penser que ce concept représente une voie de conciliation entre l'éthique et l'économique au sein de la firme.`,
        date: "2020",
        category: "Entrepreneuriat",
        author: "M. Belafhaili, H. Belmaati",
        imageCover: "/articles images/le concept de l entrepreneur citoyen.jpg",
        pdfUrl: "/articles/sara,+19227-49399-1-CE.pdf"
    },
    {
        id: '2',
        slug: 'rse-et-performance-financiere',
        title: "La Responsabilité sociale des entreprises (RSE) et performance financière",
        excerpt: "Impact des pratiques de responsabilité sociale des entreprises sur la performance financière et sociale des entreprises marocaines cotées en bourse.",
        content: `Notre article traite l'impact des pratiques de responsabilité sociale des entreprises (RSE) sur la performance financière et sociale des entreprises marocaines cotées en bourse, trois types de pratiques sont illustrées à travers notre étude : environnementale, sociale et de gouvernance.

Pour mesurer l'impact, nous avons adopté une approche de recherche triangulaire, en utilisant à la fois une méthodologie exploratoire et confirmatoire pour l'achever par une modélisation économétrique combinant les deux méthodologies.

D'après les résultats obtenus, on constate que ces entreprises marocaines investissent de manière inégale dans les différents domaines de la RSE, en accordant une préférence au volet social. L'article pourra éclairer les décideurs sur les déterminants majeurs de la responsabilité sociale.`,
        date: "Publication Académique",
        category: "RSE",
        author: "M. Belafhaili, I. Rabhi",
        imageCover: "/articles images/la responsabilite sociale des entreprise rse.jpg",
        pdfUrl: "/articles/admin,+Article+BELAFHAILI.pdf"
    },
    {
        id: '3',
        slug: 'digitalisation-et-developpement-economique',
        title: "La Digitalisation au Maroc : Quels impacts sur le développement ?",
        excerpt: "Analyse du degré de digitalisation au Maroc et de son impact positif sur le développement économique et la croissance.",
        content: `Au cours des dernières décennies, le Maroc a émergé comme un acteur clé dans le secteur technologique, exploitant la connectivité, les télécommunications et la transformation numérique. 

L'hypothèse centrale de l'étude affirme que la digitalisation a un impact positif sur le développement économique au Maroc, avec des hypothèses dérivées sur l'amélioration significative du niveau de digitalisation entre 2010 et 2020, ainsi que sur la relation positive entre le développement digital et la croissance économique. 

L'article, structuré en trois phases, évalue le degré de digitalisation, présente l'approche spécifique au Maroc avec le traitement des données empiriques, et conclut en soulignant l'importance de renforcer les politiques axées sur la culture numérique.`,
        date: "2023",
        category: "Technologie",
        author: "I. Rabhi, M. Belafhaili",
        imageCover: "/articles images/la digitalisation au maroc.jpg",
        pdfUrl: "/articles/719475195-BELAFHAILI-et-RABHI-1.pdf"
    },
    {
        id: '4',
        slug: 'corporate-citizens-commitments',
        title: "Impacts of Corporate Citizens' Commitments on The Consumer",
        excerpt: "How perceptions of social and societal responsibility of brands influence the process of Moroccan consumer engagement.",
        content: `Our article seeks to understand how perceptions of social and societal responsibility of brands influence the process of consumer engagement. For this, we are interested in the specific expectations of consumers in terms of the social responsibility of the citizen brands they consume.

Our results indicate that a consumer perceives a brand as socially responsible if it assumes, in addition to its environmental and philanthropic responsibility, a health responsibility for the respect of the health of its consumers. 

Our results confirm the influence of social responsibility perceptions on consumer engagement with the brand and offer a new understanding of the relationship process at work within modern business ethics and marketing.`,
        date: "2021",
        category: "Social",
        author: "Mohamed Belafhaili",
        imageCover: "/articles images/impact of corporate citizes.jpg",
        pdfUrl: "/articles/3886-Article+Text-31236-34165-10-20210113.pdf"
    }
];
