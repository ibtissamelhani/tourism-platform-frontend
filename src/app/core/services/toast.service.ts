import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { ToastType } from '../models/ToastType';
import { ToastComponent } from '../../component/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private activeToasts: ComponentRef<ToastComponent>[] = [];

  showToast(type: ToastType, title: string, message: string, timeout: number = 5000): void {
    // Create the component
    const toastComponentRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    // Set input properties
    const toastInstance = toastComponentRef.instance;
    toastInstance.type = type;
    toastInstance.title = title;
    toastInstance.message = message;
    toastInstance.timeout = timeout;

    // Append to the DOM
    document.body.appendChild(toastComponentRef.location.nativeElement);
    
    // Add to app change detection
    this.appRef.attachView(toastComponentRef.hostView);
    
    // Store reference to destroy later
    this.activeToasts.push(toastComponentRef);
    
    // Clean up when toast is closed
    setTimeout(() => {
      this.removeToast(toastComponentRef);
    }, timeout + 100); // Add a small buffer to ensure animation completes
  }

  success(title: string, message: string, timeout: number = 5000): void {
    this.showToast('success', title, message, timeout);
  }

  error(title: string, message: string, timeout: number = 5000): void {
    this.showToast('error', title, message, timeout);
  }

  info(title: string, message: string, timeout: number = 5000): void {
    this.showToast('info', title, message, timeout);
  }

  warning(title: string, message: string, timeout: number = 5000): void {
    this.showToast('warning', title, message, timeout);
  }

  private removeToast(toastRef: ComponentRef<ToastComponent>): void {
    const index = this.activeToasts.indexOf(toastRef);
    if (index > -1) {
      // Remove from our internal array
      this.activeToasts.splice(index, 1);
      
      // Detach from change detection
      this.appRef.detachView(toastRef.hostView);
      
      // Remove from DOM
      const element = toastRef.location.nativeElement;
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      
      // Destroy the component
      toastRef.destroy();
    }
  }
}
