import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastOptions {
  type?: 'success' | 'error' | 'info';
  duration?: number; // ms
}

@Injectable({ providedIn: 'root' })
export class SimpleToastService {
  // Emits toast payloads
  messages$ = new Subject<{ text: string; options?: ToastOptions }>();

  open(text: string, options?: ToastOptions) {
    this.messages$.next({ text, options });
  }

  success(text: string, duration = 4000) {
    this.open(text, { type: 'success', duration });
  }

  error(text: string, duration = 5000) {
    this.open(text, { type: 'error', duration });
  }

  info(text: string, duration = 3000) {
    this.open(text, { type: 'info', duration });
  }
}
