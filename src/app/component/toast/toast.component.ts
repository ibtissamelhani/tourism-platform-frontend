import { Component, Input, OnInit, signal } from '@angular/core';
import { ToastType } from '../../core/models/ToastType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
  @if (visible()) {
      <div 
        class="toast-container" 
        [ngClass]="'toast-' + type"
        (click)="hideToast()">
        <div class="toast-icon">
          @switch (type) {
            @case ('success') {
              ✓
            }
            @case ('error') {
              ✗
            }
            @case ('info') {
              ℹ
            }
            @case ('warning') {
              ⚠
            }
          }
        </div>
        <div class="toast-content">
          <div class="toast-title">{{ title }}</div>
          <div class="toast-message">{{ message }}</div>
        </div>
        <div class="toast-close" (click)="hideToast()">×</div>
      </div>
    }
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      min-width: 300px;
      max-width: 400px;
      padding: 15px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      cursor: pointer;
    }

    .toast-success {
      background-color: #4CAF50;
      color: white;
    }

    .toast-error {
      background-color: #F44336;
      color: white;
    }

    .toast-info {
      background-color: #2196F3;
      color: white;
    }

    .toast-warning {
      background-color: #FF9800;
      color: white;
    }

    .toast-icon {
      font-size: 24px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 30px;
    }

    .toast-content {
      flex: 1;
    }

    .toast-title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .toast-message {
      font-size: 14px;
    }

    .toast-close {
      font-size: 20px;
      cursor: pointer;
      padding: 0 5px;
    }
  `]
})
export class ToastComponent implements OnInit {
  @Input() type: ToastType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() timeout: number = 5000;

  visible = signal(false);
  private timeoutId: any;

  ngOnInit(): void {
    this.showToast();
  }

  showToast(): void {
    this.visible.set(true);
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.hideToast();
    }, this.timeout);
  }

  hideToast(): void {
    this.visible.set(false);
    this.clearTimeout();
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
