import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  // Données pour HomeComponent
  getHomeData() {
    return {
      titrePrincipal: 'Tanzil Corporation — L\'innovation au service de la construction durable.',
      sousTitre: 'Nous modernisons le BTP en Afrique de l\'Ouest grâce à la technologie et aux partenariats internationaux.',
      visionItems: [
        { icone: '🚀', titre: 'Innovation technologique', description: 'Intégration de technologies avancées dans nos processus.' },
        { icone: '🤝', titre: 'Partenariat international', description: 'Collaborations stratégiques avec des experts mondiaux.' },
        { icone: '🌱', titre: 'Développement durable', description: 'Engagement pour une construction respectueuse de l\'environnement.' }
      ],
      projetsRecents: [
        { titre: 'Projet Résidentiel Excellence', description: 'Complexe résidentiel de luxe.', image: 'assets/images/projet1.jpg' },
        { titre: 'Centre Commercial Moderne', description: 'Espace commercial innovant.', image: 'assets/images/projet2.jpg' },
        { titre: 'Infrastructure Routière', description: 'Développement durable.', image: 'assets/images/projet3.jpg' }
      ]
    };
  }

  // Données pour AboutComponent
  getAboutData() {
    return {
      timeline: [
        { annee: 2015, description: 'Fondation de Tanzil Corporation' },
        { annee: 2018, description: 'Lancement des premiers projets immobiliers' },
        { annee: 2022, description: 'Partenariat stratégique Turquie & Russie' },
        { annee: 2025, description: 'Lancement du programme d\'investissement participatif' }
      ],
      equipe: [
        { nom: 'Jean Dupont', poste: 'PDG', description: 'Ingénieur en génie civil' },
        { nom: 'Marie Martin', poste: 'DG Adjoint', description: 'Expert BTP' },
        { nom: 'Pierre Durand', poste: 'Directeur Innovation', description: 'Ingénieur matériaux' },
        { nom: 'Sophie Leroy', poste: 'Directeur Financier', description: 'Analyste investissements' }
      ],
      valeurs: [
        'Innovation & Qualité',
        'Transparence & Performance',
        'Partenariat & Développement local'
      ]
    };
  }

  // Données pour ActivitiesComponent
  getActivitiesData() {
    return [
      { icone: '🏗️', titre: 'BTP & Construction', description: 'Conception, réalisation, gestion de chantiers.', bouton: 'Découvrir' },
      { icone: '🏢', titre: 'Promotion immobilière', description: 'Appartements et immeubles modernes.', bouton: 'Découvrir' },
      { icone: '🚚', titre: 'Distribution de matériaux', description: 'Adjuvants, fer, ciments, bétons techniques.', bouton: 'Découvrir' },
      { icone: '🔬', titre: 'Innovation technologique', description: 'Recherche et partenariats internationaux.', bouton: 'Découvrir' }
    ];
  }

  // Données pour ProjectsComponent
  getProjectsData() {
    return {
      realises: [
        { titre: 'Projet A', description: 'Description courte.', images: ['assets/images/proj1.jpg'] },
        { titre: 'Projet B', description: 'Description courte.', images: ['assets/images/proj2.jpg'] }
      ],
      enCours: [
        { titre: 'Projet C', avancement: 75, partenaires: 'Partenaire X', cout: '500M FCFA' },
        { titre: 'Projet D', avancement: 50, partenaires: 'Partenaire Y', cout: '300M FCFA' }
      ]
    };
  }

  // Données pour InvestmentComponent
  getInvestmentData() {
    return {
      titre: 'Investissez dans l\'avenir du BTP en Afrique de l\'Ouest',
      sousTitre: 'Rejoignez Tanzil Corporation dans sa mission de moderniser le secteur de la construction grâce à l\'innovation technologique et aux partenariats stratégiques.',
      conceptTitre: 'Notre Concept d\'Investissement Participatif',
      conceptDescription: 'Tanzil Corporation propose un modèle d\'investissement transparent et accessible, permettant aux particuliers et entreprises de participer à la croissance du secteur BTP en Afrique de l\'Ouest. Nos projets sont sélectionnés pour leur potentiel de rendement et leur impact positif sur le développement local.',
      avantages: [
        'Rendements attractifs et réguliers',
        'Transparence totale sur l\'utilisation des fonds',
        'Diversification du portefeuille d\'investissement',
        'Contribution au développement économique local'
      ],
      projets: [
        {
          nom: 'Complexe Résidentiel Excellence',
          secteur: 'Immobilier',
          montantMinimum: 50000,
          rendementAttendu: '12-15%',
          duree: '24 mois',
          statut: 'Ouvert aux investissements',
          description: 'Développement d\'un complexe résidentiel premium avec équipements modernes.',
          image: 'assets/images/investissements/residentiel.jpg'
        },
        {
          nom: 'Centre Commercial Moderne',
          secteur: 'Commercial',
          montantMinimum: 100000,
          rendementAttendu: '14-18%',
          duree: '18 mois',
          statut: 'Fermé - Phase de construction',
          description: 'Construction d\'un centre commercial innovant au cœur de Dakar.',
          image: 'assets/images/investissements/commercial.jpg'
        },
        {
          nom: 'Infrastructure Routière Durable',
          secteur: 'Infrastructure',
          montantMinimum: 25000,
          rendementAttendu: '10-13%',
          duree: '36 mois',
          statut: 'Ouvert aux investissements',
          description: 'Développement d\'infrastructures routières respectueuses de l\'environnement.',
          image: 'assets/images/investissements/infrastructure.jpg'
        }
      ],
      formulaireTitre: 'Manifestez votre intérêt',
      formulaireDescription: 'Remplissez ce formulaire pour être informé des nouvelles opportunités d\'investissement.'
    };
  }

  // Données pour BlogComponent
  getBlogData() {
    return [
      {
        titre: 'Les innovations technologiques dans le BTP en Afrique de l\'Ouest',
        date: '2025-10-01',
        auteur: 'Équipe Innovation Tanzil',
        resume: 'Découvrez comment Tanzil Corporation révolutionne le secteur du bâtiment et travaux publics en Afrique de l\'Ouest grâce à l\'intégration des dernières technologies. De la modélisation 3D à l\'intelligence artificielle, explorez les innovations qui transforment nos chantiers.',
        image: 'assets/images/blog/innovation-btp.jpg',
        categorie: 'Innovation',
        tempsLecture: '5 min'
      },
      {
        titre: 'Partenariat stratégique Tanzil Corporation - Russie : vers une excellence internationale',
        date: '2025-09-15',
        auteur: 'Direction Internationale',
        resume: 'Tanzil Corporation annonce un partenariat majeur avec des entreprises russes de premier plan. Cette collaboration stratégique vise à apporter l\'expertise internationale dans les projets de construction au Sénégal et en Afrique de l\'Ouest.',
        image: 'assets/images/blog/partenariat-russie.jpg',
        categorie: 'Partenariat',
        tempsLecture: '4 min'
      },
      {
        titre: 'L\'avenir de la construction durable au Sénégal : enjeux et perspectives',
        date: '2025-08-20',
        auteur: 'Département R&D',
        resume: 'Dans un contexte de changement climatique, la construction durable devient une priorité. Tanzil Corporation s\'engage dans des pratiques respectueuses de l\'environnement, de l\'utilisation de matériaux écologiques à l\'optimisation énergétique des bâtiments.',
        image: 'assets/images/blog/construction-durable.jpg',
        categorie: 'Développement Durable',
        tempsLecture: '6 min'
      }
    ];
  }

  // Données pour ContactComponent
  getContactData() {
    return {
      titre: 'Contactez-nous',
      sousTitre: 'Nous sommes à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets.',
      formulaireTitre: 'Envoyez-nous un message',
      formulaireDescription: 'Notre équipe vous répondra dans les plus brefs délais.',
      coordonnees: {
        adresse: 'Immeuble A. FOFANA 2466, Avenue Bourguiba, Dakar, Sénégal',
        telephone: '+221 77 000 00 00',
        email: 'contact@tanzilcorporation.com',
        site: 'www.tanzilcorporation.com',
        horaires: 'Lundi - Vendredi: 8h00 - 18h00'
      },
      reseauxSociaux: {
        linkedin: 'https://linkedin.com/company/tanzil-corporation',
        twitter: 'https://twitter.com/tanzilcorp',
        facebook: 'https://facebook.com/tanzilcorporation'
      },
      whatsapp: {
        numero: '+221770000000',
        message: 'Bonjour, je souhaite obtenir plus d\'informations sur Tanzil Corporation.'
      }
    };
  }

  // Données pour DashboardComponent
  getDashboardData() {
    return {
      titre: 'Tableau de bord investisseur',
      bienvenue: 'Bienvenue sur votre tableau de bord d\'investissement Tanzil Corporation',
      resume: {
        solde: 2500000,
        totalInvesti: 5000000,
        nombreProjets: 3,
        rendementGlobal: 12.5,
        dividendesRecus: 125000,
        performanceAnnuelle: 8.5
      },
      historique: [
        { date: '2025-10-01', type: 'Versement', montant: 1000000, statut: 'Confirmé', description: 'Versement initial' },
        { date: '2025-09-15', type: 'Dividende', montant: 25000, statut: 'Payé', description: 'Dividende projet Alpha' },
        { date: '2025-08-20', type: 'Investissement', montant: 2000000, statut: 'Confirmé', description: 'Investissement projet Beta' },
        { date: '2025-07-10', type: 'Dividende', montant: 35000, statut: 'Payé', description: 'Dividende projet Gamma' },
        { date: '2025-06-05', type: 'Versement', montant: 500000, statut: 'Confirmé', description: 'Versement complémentaire' }
      ],
      repartition: [
        { projet: 'Complexe Résidentiel Excellence', pourcentage: 45, montant: 2250000, rendement: 15.2 },
        { projet: 'Centre Commercial Moderne', pourcentage: 35, montant: 1750000, rendement: 12.8 },
        { projet: 'Infrastructure Routière Durable', pourcentage: 20, montant: 1000000, rendement: 10.5 }
      ],
      projetsInvestis: [
        {
          titre: 'Complexe Résidentiel Excellence',
          description: 'Investissement en cours - Rendement attendu: 15.2%',
          image: 'assets/images/dashboard/residentiel.jpg',
          statut: 'En cours',
          progression: 75,
          montantInvesti: 2250000,
          rendementRealise: 8.5
        },
        {
          titre: 'Centre Commercial Moderne',
          description: 'Investissement réalisé - Rendement obtenu: 12.8%',
          image: 'assets/images/dashboard/commercial.jpg',
          statut: 'Terminé',
          progression: 100,
          montantInvesti: 1750000,
          rendementRealise: 12.8
        },
        {
          titre: 'Infrastructure Routière Durable',
          description: 'Investissement en cours - Rendement attendu: 10.5%',
          image: 'assets/images/dashboard/infrastructure.jpg',
          statut: 'En cours',
          progression: 45,
          montantInvesti: 1000000,
          rendementRealise: 3.2
        }
      ]
    };
  }
}