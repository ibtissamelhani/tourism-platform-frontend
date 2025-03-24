import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
  <nav class="absolute top-0 left-0 right-0 z-20 px-4 md:px-8 py-4 md:py-6">
  <div class="flex justify-between items-center">
    <!-- Logo - Always visible -->
    <div routerLink="/" class="text-white text-xl md:text-2xl font-bold flex items-center hover:cursor-pointer"> 
      <span class="material-symbols-outlined mr-1 md:mr-2 text-yellow-400">explore</span> 
      <span class="hidden sm:inline">DadesAdventures</span>
      <span class="sm:hidden">DadesAdventures</span>
    </div>
    
    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-4 lg:gap-8">
      <button 
        routerLink="/authentication/login"
        routerLinkActive="bg-red-500"
        class="bg-transparent border border-white/60 hover:bg-white/10 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors duration-300 flex items-center">
        <span class="material-symbols-outlined mr-1">account_circle</span>
        Sign In
      </button>
      <button        
        routerLink="/authentication/register"  
        routerLinkActive="bg-red-500"
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors duration-300 flex items-center">
        <span class="material-symbols-outlined mr-1">add_circle</span> 
        Sign Up 
      </button>
    </div>
    
    <!-- Mobile Menu Button -->
    <button class="md:hidden text-white flex items-center" (click)="toggleMobileMenu()">
      <span class="material-symbols-outlined" *ngIf="!isMobileMenuOpen">menu</span>
      <span class="material-symbols-outlined" *ngIf="isMobileMenuOpen">close</span>
    </button>
  </div>
  
  <!-- Mobile Menu -->
  <div *ngIf="isMobileMenuOpen" class="md:hidden mt-4 rounded-lg bg-gray-900/90 shadow-lg backdrop-blur-sm">
    <div class="flex flex-col p-4">
      <button 
        routerLink="/authentication/login"
        routerLinkActive="bg-red-500"
        class="bg-transparent border border-white/60 hover:bg-white/10 text-white px-4 py-2 rounded-lg mb-3 transition-colors duration-300 flex items-center justify-center">
        <span class="material-symbols-outlined mr-1">account_circle</span>
        Sign In
      </button>
      <button        
        routerLink="/authentication/register"  
        routerLinkActive="bg-red-500"
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center">
        <span class="material-symbols-outlined mr-1">add_circle</span> 
        Sign Up 
      </button>
    </div>
  </div>
</nav>
  `,
  styles: ``
})
export class AuthNavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  // Optional: Close menu when clicking on a link
  closeMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
