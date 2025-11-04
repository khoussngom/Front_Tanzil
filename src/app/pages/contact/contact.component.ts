import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SimpleToastComponent } from '../../components/simple-toast/simple-toast.component';
import { SimpleToastService } from '../../components/simple-toast/simple-toast.service';
import { ContentService } from '../../services/content.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { emailJsConfig } from '../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, SimpleToastComponent],
  template: `
    <section class="relative min-h-screen bg-gray-50">
      <div class="container mx-auto px-6 py-16 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-7xl mx-auto">
          
          <!-- Colonne gauche : Formulaire -->
          <div class="slide-up order-2 lg:order-1 max-w-xl">
            <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 fade-in">
              {{ data?.titre || 'Nous Contacter' }}
            </h1>

            <form (ngSubmit)="envoyerMessage()" class="space-y-8">
              <!-- Nom Complet -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  {{ 'CONTACT.NOM' | translate }}
                </label>
                <input
                  type="text"
                  [(ngModel)]="formulaire.nom"
                  name="nom"
                  required
                  class="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-900 focus:outline-none focus:ring-0 transition-colors duration-200 bg-transparent text-gray-900 text-base"
                  placeholder="Prénom(s) Nom"
                >
              </div>

              <!-- Email -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  {{ 'CONTACT.EMAIL' | translate }}
                </label>
                <input
                  type="email"
                  [(ngModel)]="formulaire.email"
                  name="email"
                  required
                  class="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-900 focus:outline-none focus:ring-0 transition-colors duration-200 bg-transparent text-gray-900 text-base"
                  placeholder="email@gmail.com"
                >
              </div>

              <!-- Votre Message -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  {{ 'CONTACT.MESSAGE' | translate }}
                </label>
                <textarea
                  [(ngModel)]="formulaire.message"
                  name="message"
                  rows="5"
                  required
                  class="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none focus:ring-0 transition-colors duration-200 bg-white text-gray-900 resize-none text-base"
                  placeholder=""
                ></textarea>
              </div>

              <!-- Bouton Submit -->
              <button
                type="submit"
                [disabled]="isSubmitting"
                class="w-full bg-blue-900 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-base mt-6"
              >
                <span *ngIf="!isSubmitting">{{ 'CONTACT.ENVOYER' | translate }}</span>
                <span *ngIf="isSubmitting" class="flex items-center space-x-3">
                  <svg class="animate-spin inline-block" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="4"></circle>
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
                  </svg>
                  <span>{{ 'CONTACT.ENVOYER' | translate }}</span>
                </span>
              </button>
            </form>
          </div>

          <!-- Colonne droite : Logo TANZIL -->
          <div class="slide-up order-1 lg:order-2 flex items-center justify-center">
            <div class="w-full max-w-lg fade-in">
              <!-- Logo TANZIL CORPORATION -->
              <div class="flex flex-col items-center">
                <!-- Logo image -->
                <div class="relative pt-8 w-full flex justify-center">
                  <img 
                    src="assets/images/logo-preview.png" 
                    alt="Tanzil Corporation Logo" 
                    class="w-full max-w-md lg:max-w-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Bouton WhatsApp flottant -->
    <a
      [href]="getWhatsappUrl()"
      target="_blank"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-green-700 hover:scale-110 transition-all duration-300 z-50 whatsapp-float group"
      title="{{ 'CONTACT.WHATSAPP' | translate }}"
    >
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
    </a>

    <app-simple-toast></app-simple-toast>
  `,
  styles: [`
    .whatsapp-float {
      animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { 
        transform: translateY(0px); 
      }
      50% { 
        transform: translateY(-10px); 
      }
    }

    .form-group input:focus,
    .form-group textarea:focus {
      transform: translateY(-2px);
    }

    input::placeholder,
    textarea::placeholder {
      color: #D1D5DB;
      font-size: 0.95rem;
    }

    label {
      font-weight: 500;
    }

    /* Style pour les inputs avec border-bottom uniquement */
    input[type="text"],
    input[type="email"] {
      background-image: none;
      -webkit-appearance: none;
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
  isSubmitting = false;

  constructor(
    private contentService: ContentService, 
    private translate: TranslateService, 
    private toast: SimpleToastService
  ) {}

  ngOnInit() {
    this.data = this.contentService.getContactData();
  }

  ngAfterViewInit() {
    this.initialiserAnimations();
  }

  initialiserAnimations() {
    gsap.set('.fade-in', { opacity: 1, y: 0 });
    gsap.set('.slide-up', { opacity: 1, y: 0 });
    gsap.set('.whatsapp-float', { opacity: 1, scale: 1 });
  }

  envoyerMessage() {
    // validation simple
    if (!(this.formulaire.nom && this.formulaire.email && this.formulaire.message)) {
      this.toast.error(this.translate.instant('CONTACT.ERREUR_CHAMPS') || 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const templateParams = {
      from_name: this.formulaire.nom,
      from_email: this.formulaire.email,
      telephone: this.formulaire.telephone || '',
      subject: this.formulaire.sujet || '',
      message: this.formulaire.message
    };

    const { serviceId: SERVICE_ID, templateId: TEMPLATE_ID, publicKey: PUBLIC_KEY } = emailJsConfig;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result: EmailJSResponseStatus) => {
        gsap.to('.form-group', {
          scale: 0.98,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });

        this.toast.success(this.translate.instant('CONTACT.SUCCES_MESSAGE') || 'Votre message a été envoyé avec succès.');
        this.formulaire = { nom: '', email: '', telephone: '', sujet: '', message: '' };
        this.isSubmitting = false;
      })
      .catch((error: any) => {
        let errorMessage = this.translate.instant('CONTACT.ERREUR_MESSAGE') || 'Une erreur est survenue lors de l\'envoi.';
        
        // Messages d'erreur plus spécifiques
        if (error.status === 400) {
          errorMessage = 'Configuration EmailJS invalide. Vérifiez vos identifiants.';
        } else if (error.status === 422) {
          errorMessage = 'Template EmailJS invalide. Vérifiez les paramètres du template.';
        } else if (error.text) {
          errorMessage = `Erreur EmailJS: ${error.text}`;
        }
        
        this.toast.error(errorMessage);
        this.isSubmitting = false;
      });
  }

  getWhatsappUrl() {
    const numero = this.data?.whatsapp?.numero || '221778743024';
    const message = this.data?.whatsapp?.message || 'Bonjour, je souhaite vous contacter';
    return `https://wa.me/221778743024?text=${encodeURIComponent(message)}`;
  }
}