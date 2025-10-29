import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <video
      autoplay
      muted
      loop
      class="fixed inset-0 w-full h-full object-cover z-[-1]"
      src="assets/media/video.mp4"
    ></video>

    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 160px); /* Ajuster selon la hauteur du header/footer */
    }

    video {
      filter: brightness(0.6);
    }
  `]
})
export class AppComponent {
  title = 'Tanzil Corporation';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    const savedLang = localStorage.getItem('langue');
    if (savedLang && /fr|en/.test(savedLang)) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const lang = (browserLang && /fr|en/.test(browserLang)) ? browserLang : 'fr';
      this.translate.use(lang);
    }
  }
}