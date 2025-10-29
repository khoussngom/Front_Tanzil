import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCTAComponent } from '../../components/button-cta/button-cta.component';
import { ContentService } from '../../services/content.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ButtonCTAComponent],
  templateUrl: './investment.component.html',
  styles: []
})
export class InvestmentComponent implements OnInit, AfterViewInit {
  afficherForm: boolean = false;
  data: any;
  formulaire = {
    nom: '',
    email: '',
    telephone: '',
    montant: 0,
    message: ''
  };

  boutonTexteSinscrire = "S'inscrire";
  boutonTexteInvestir = 'Investir';
  boutonTexteSoumettre = 'Soumettre';

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.data = this.contentService.getInvestmentData();
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Animation du hero
    gsap.from('.hero-investment', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });

    // Animation de la section concept
    gsap.from('.concept-section', {
      scrollTrigger: {
        trigger: '.concept-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animation des avantages avec stagger
    gsap.from('.avantage-item', {
      scrollTrigger: {
        trigger: '.avantages-list',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Animation du tableau des projets
    gsap.from('.projets-table', {
      scrollTrigger: {
        trigger: '.projets-investissement-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animation des lignes du tableau avec stagger
    gsap.from('.table-row', {
      scrollTrigger: {
        trigger: '.projets-table',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Animation du formulaire
    gsap.from('.formulaire-section', {
      scrollTrigger: {
        trigger: '.formulaire-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  afficherFormulaire() {
    this.afficherForm = true;
    // Animation d'apparition du formulaire
    setTimeout(() => {
      gsap.from('.formulaire-section', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, 100);
  }

  soumettreFormulaire() {
    if (this.formulaire.nom && this.formulaire.email && this.formulaire.telephone && this.formulaire.montant) {
      console.log('Formulaire soumis:', this.formulaire);
      // TODO: Envoyer les données au backend via ApiService
      alert('Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.');
      this.afficherForm = false;
      this.formulaire = { nom: '', email: '', telephone: '', montant: 0, message: '' };
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}