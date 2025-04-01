import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  template: `
    <nav class="absolute bg-blue-900/40 top-0 left-0 right-0 z-20 px-4 md:px-8 py-2">
      <div class="flex justify-between items-center">
        <div routerLink="/" class="text-white text-xl md:text-2xl font-bold flex items-center hover:cursor-pointer">
          <span class="material-symbols-outlined mr-2 text-yellow-400">explore</span>
          <span class="hidden sm:inline">DadesAdventures</span>
          <span class="sm:hidden">DadesAdventures</span>
        </div>
        
        <!-- Mobile menu button -->
        <button (click)="isMenuOpen = !isMenuOpen" class="md:hidden text-white focus:outline-none">
          <span class="material-symbols-outlined">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>
        
        <!-- Desktop navigation -->
        <div class="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#" routerLinkActive="bg-yellow-500 px-4 py-2 rounded-full" class="text-white hover:text-yellow-400 transition-colors">Home</a>
          <a href="#" class="text-white hover:text-yellow-500 transition-colors">Destinations</a>
          <a href="#" class="text-white hover:text-yellow-400 transition-colors">Activities</a>
          <a routerLink="/about" routerLinkActive="bg-yellow-500 px-4 py-2 rounded-full" class="text-white hover:text-yellow-400 transition-colors">About Us</a>
          <a routerLink="/contact" routerLinkActive="bg-yellow-500 px-4 py-2 rounded-full" class="text-white hover:text-yellow-400 transition-colors">Contact</a>
          
          <details class="relative">
            <summary class="list-none text-white cursor-pointer flex items-center">
              <span class="material-symbols-outlined">language</span>
              <span class="ml-1">EN</span>
              <span class="material-symbols-outlined text-sm">expand_more</span>
            </summary>
            <div class="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-24 py-1 z-50">
              <a href="#" class="block px-4 py-2 hover:bg-blue-50">English</a>
              <a href="#" class="block px-4 py-2 hover:bg-blue-50">Français</a>
              <a href="#" class="block px-4 py-2 hover:bg-blue-50">العربية</a>
            </div>
          </details>
          <button 
          *ngIf="isAuthenticated()" 
            routerLink="/profile" 
            routerLinkActive="bg-yellow-500"
            class="bg-transparent border border-white/60 hover:bg-white/10 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full transition-colors duration-300 flex items-center text-sm lg:text-base">
            <span class="material-symbols-outlined mr-1">account_circle</span>
            Profile
          </button>
          <button 
          *ngIf="!isAuthenticated()"
            routerLink="/authentication/login" 
            class="bg-transparent border border-white/60 hover:bg-white/10 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full transition-colors duration-300 flex items-center text-sm lg:text-base">
            <span class="material-symbols-outlined mr-1">account_circle</span>
            Sign In
          </button>
          
          
          <button 
          *ngIf="!isAuthenticated()"       
            routerLink="/authentication/register"  
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full transition-colors duration-300 flex items-center text-sm lg:text-base">
            <span class="material-symbols-outlined mr-1">add_circle</span> Sign Up
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div *ngIf="isMenuOpen" class="md:hidden mt-4 pb-4 flex flex-col gap-4">
        <a href="#" routerLinkActive="bg-yellow-500 px-4 py-2 rounded-full" class="text-white hover:text-yellow-400 transition-colors py-2">Home</a>
        <a href="#" class="text-white hover:text-yellow-500 transition-colors py-2">Destinations</a>
        <a href="#" class="text-white hover:text-yellow-400 transition-colors py-2">Activities</a>
        <a routerLink="/about" routerLinkActive="bg-yellow-500 px-4 py-2 rounded-full" class="text-white hover:text-yellow-400 transition-colors py-2">About Us</a>
        <a routerLink="/contact" routerLinkActive="bg-yellow-500 px-4 py-2 rounded-full" class="text-white hover:text-yellow-400 transition-colors py-2">Contact</a>
        
        <div class="flex items-center gap-2 py-2">
          <span class="material-symbols-outlined text-white">language</span>
          <a href="#" class="text-white px-2">English</a>
          <a href="#" class="text-white px-2">Français</a>
          <a href="#" class="text-white px-2">العربية</a>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 pt-2">
          <button 
            routerLink="/authentication/login" 
            class="bg-transparent border border-white/60 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center justify-center">
            <span class="material-symbols-outlined mr-1">account_circle</span>
            Sign In
          </button>
          
          <button        
            routerLink="/authentication/register"  
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center justify-center">
            <span class="material-symbols-outlined mr-1">add_circle</span> Sign Up
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}