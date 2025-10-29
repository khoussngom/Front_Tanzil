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
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ButtonCTAComponent],
  template: `
    <section class="hero-contact py-20 bg-gradient-to-r from-bleu-fonce to-gris-acier text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-montserrat font-bold mb-6 fade-in">
          {{ data?.titre }}
        </h1>
        <p class="text-xl max-w-2xl mx-auto fade-in">
          {{ data?.sousTitre }}
        </p>
      </div>
    </section>

    <section class="contact-section py-20 bg-white/80 backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="slide-up">
            <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce mb-4">
              {{ data?.formulaireTitre }}
            </h2>
            <p class="text-gris-acier mb-8">
              {{ data?.formulaireDescription }}
            </p>

            <form (ngSubmit)="envoyerMessage()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-bleu-fonce mb-2">
                    {{ 'CONTACT.NOM' | translate }} *
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formulaire.nom"
                    name="nom"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-jaune"
                    placeholder="Votre nom complet"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-bleu-fonce mb-2">
                    {{ 'CONTACT.TELEPHONE' | translate }}
                  </label>
                  <input
                    type="tel"
                    [(ngModel)]="formulaire.telephone"
                    name="telephone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-jaune"
                    placeholder="+221 XX XXX XX XX"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-bleu-fonce mb-2">
                  {{ 'CONTACT.EMAIL' | translate }} *
                </label>
                <input
                  type="email"
                  [(ngModel)]="formulaire.email"
                  name="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-jaune"
                  placeholder="votre.email@exemple.com"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-bleu-fonce mb-2">
                  {{ 'CONTACT.SUJET' | translate }} *
                </label>
                <input
                  type="text"
                  [(ngModel)]="formulaire.sujet"
                  name="sujet"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-jaune"
                  placeholder="Objet de votre message"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-bleu-fonce mb-2">
                  {{ 'CONTACT.MESSAGE' | translate }} *
                </label>
                <textarea
                  [(ngModel)]="formulaire.message"
                  name="message"
                  rows="5"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-jaune"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <app-button-cta
                [texte]="'CONTACT.ENVOYER' | translate"
                variante="primaire"
                taille="moyen"
                type="submit"
              ></app-button-cta>
            </form>
          </div>

          <div class="slide-up">
            <h2 class="text-3xl font-montserrat font-bold text-bleu-fonce mb-8">
              {{ 'CONTACT.INFORMATIONS' | translate }}
            </h2>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-accent-jaune rounded-full flex items-center justify-center flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 class="font-montserrat font-bold text-bleu-fonce mb-1">{{ 'CONTACT.ADRESSE' | translate }}</h3>
                  <p class="text-gris-acier">{{ data?.coordonnees.adresse }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-accent-jaune rounded-full flex items-center justify-center flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 class="font-montserrat font-bold text-bleu-fonce mb-1">{{ 'CONTACT.TELEPHONE_LABEL' | translate }}</h3>
                  <p class="text-gris-acier">{{ data?.coordonnees.telephone }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-accent-jaune rounded-full flex items-center justify-center flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 class="font-montserrat font-bold text-bleu-fonce mb-1">{{ 'CONTACT.EMAIL_LABEL' | translate }}</h3>
                  <p class="text-gris-acier">{{ data?.coordonnees.email }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-accent-jaune rounded-full flex items-center justify-center flex-shrink-0">
                  🕒
                </div>
                <div>
                  <h3 class="font-montserrat font-bold text-bleu-fonce mb-1">{{ 'CONTACT.HORAIRES' | translate }}</h3>
                  <p class="text-gris-acier">{{ data?.coordonnees.horaires }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-accent-jaune rounded-full flex items-center justify-center flex-shrink-0">
                  🌐
                </div>
                <div>
                  <h3 class="font-montserrat font-bold text-bleu-fonce mb-1">{{ 'CONTACT.SITE' | translate }}</h3>
                  <a [href]="'https://' + data?.coordonnees.site" target="_blank" class="text-accent-jaune hover:text-accent-orange transition-colors">
                    {{ data?.coordonnees.site }}
                  </a>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="font-montserrat font-bold text-bleu-fonce mb-4">{{ 'CONTACT.RESEAUX_SOCIAUX' | translate }}</h3>
              <div class="flex space-x-4">
                <a [href]="data?.reseauxSociaux.linkedin" target="_blank" class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  in
                </a>
                <a [href]="data?.reseauxSociaux.twitter" target="_blank" class="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  🐦
                </a>
                <a [href]="data?.reseauxSociaux.facebook" target="_blank" class="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                  f
                </a>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="font-montserrat font-bold text-bleu-fonce mb-4">{{ 'CONTACT.CARTE' | translate }}</h3>
              <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center shadow-inner">
                <div class="text-center">
                  <div class="text-4xl mb-2">🗺️</div>
                  <p class="text-gris-acier">{{ 'CONTACT.CARTE_PLACEHOLDER' | translate }}</p>
                  <p class="text-sm text-gray-500 mt-2">{{ data?.coordonnees.adresse }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <a
      [href]="getWhatsappUrl()"
      target="_blank"
      class="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 whatsapp-float"
      title="{{ 'CONTACT.WHATSAPP' | translate }}"
    >
      💬
    </a>
  `,
  styles: [`
    .whatsapp-float {
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `]
})
export class ContactComponent implements OnInit, AfterViewInit {
  data: any;
  formulaire = {
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  };

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.data = this.contentService.getContactData();
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    // Animation du hero
    gsap.from('.fade-in', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Animation des sections de contact
    gsap.from('.slide-up', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.3,
      ease: 'power2.out'
    });

    // Animation du bouton WhatsApp
    gsap.from('.whatsapp-float', {
      delay: 2,
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  }

  envoyerMessage() {
    if (this.formulaire.nom && this.formulaire.email && this.formulaire.sujet && this.formulaire.message) {
      console.log('Message envoyé:', this.formulaire);
      // TODO: Envoyer le message via ApiService
      alert('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      this.formulaire = { nom: '', email: '', telephone: '', sujet: '', message: '' };
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  getWhatsappUrl() {
    const numero = this.data?.whatsapp?.numero || '';
    const message = this.data?.whatsapp?.message || '';
    return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
  }
}