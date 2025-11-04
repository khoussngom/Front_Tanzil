import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { SimpleToastService } from './simple-toast.service';

@Component({
  selector: 'app-simple-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div aria-live="polite" aria-atomic="true" class="fixed z-50 right-4 bottom-6 flex flex-col items-end space-y-2 pointer-events-none">
      <div *ngIf="visible" [attr.role]="role" class="pointer-events-auto max-w-sm w-full rounded-lg shadow-lg px-4 py-3 flex items-start space-x-3" [ngClass]="containerClass">
        <div class="flex-shrink-0 mt-0.5">
          <svg *ngIf="type==='success'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <svg *ngIf="type==='error'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          <svg *ngIf="type==='info'" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-white" [innerText]="message"></p>
        </div>
        <button aria-label="Close" (click)="hide()" class="text-white opacity-90 hover:opacity-100 ml-2">✕</button>
      </div>
    </div>
  `,
  styles: [
    `:host { font-family: inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
     .bg-success { background: linear-gradient(90deg,#10b981,#059669); }
     .bg-error { background: linear-gradient(90deg,#ef4444,#dc2626); }
     .bg-info { background: linear-gradient(90deg,#3b82f6,#2563eb); }
  `
  ]
})
export class SimpleToastComponent implements OnInit, OnDestroy {
  message = '';
  type: 'success'|'error'|'info' = 'info';
  visible = false;
  role = 'status';

  private sub: Subscription | null = null;
  private hideTimerSub: Subscription | null = null;

  get containerClass() {
    return this.type === 'success' ? 'bg-success' : this.type === 'error' ? 'bg-error' : 'bg-info';
  }

  constructor(private toast: SimpleToastService) {}

  ngOnInit() {
    this.sub = this.toast.messages$.subscribe(payload => {
      this.message = payload.text;
      this.type = payload.options?.type || 'info';
      this.visible = true;
      this.role = this.type === 'error' ? 'alert' : 'status';

      // clear existing timer
      if (this.hideTimerSub) {
        this.hideTimerSub.unsubscribe();
        this.hideTimerSub = null;
      }

      const duration = payload.options?.duration ?? (this.type === 'error' ? 5000 : 4000);
      this.hideTimerSub = timer(duration).subscribe(() => this.hide());
    });
  }

  hide() {
    this.visible = false;
    this.message = '';
    if (this.hideTimerSub) {
      this.hideTimerSub.unsubscribe();
      this.hideTimerSub = null;
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.hideTimerSub) this.hideTimerSub.unsubscribe();
  }
}
