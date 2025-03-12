import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <nav class="absolute top-0 left-0 right-0 z-20 px-8 py-6">
      <div class="flex justify-between items-center">
        <div routerLink="/" class="text-white text-2xl font-bold flex items-center"> <span
          class="material-symbols-outlined mr-2 text-yellow-400">explore</span> DadesAdventures </div>
        <div class="flex items-center gap-8">
          <button 
          routerLink="/authentication/login"
          routerLinkActive="bg-red-500"
          class="bg-transparent border border-white/60 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center">
          <span class="material-symbols-outlined mr-1">account_circle</span>
          Sign In</button>
          <button        
          routerLink="/authentication/register"  
          routerLinkActive="bg-red-500"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center">
            <span class="material-symbols-outlined mr-1">add_circle</span> Sign Up </button>
        </div>
      </div>
    </nav>
  `,
  styles: ``
})
export class AuthNavbarComponent {

}
