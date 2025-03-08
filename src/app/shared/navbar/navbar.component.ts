import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: `
    <nav class="absolute top-0 left-0 right-0 z-20 px-8 py-6">
      <div class="flex justify-between items-center">
        <div class="text-white text-2xl font-bold flex items-center"> <span
          class="material-symbols-outlined mr-2 text-yellow-400">explore</span> DadesAdventures </div>
        <div class="flex items-center gap-8">
          <a href="#" class="text-white hover:text-yellow-400 transition-colors">Home</a>
          <a href="#" class="text-white hover:text-yellow-400 transition-colors">Destinations</a>
          <a href="#" class="text-white hover:text-yellow-400 transition-colors">Activities</a>
          <a href="#" class="text-white hover:text-yellow-400 transition-colors">About Us</a>
          <a href="#"class="text-white hover:text-yellow-400 transition-colors">Contact</a>
          <details class="relative">
            <summary class="list-none text-white cursor-pointer flex items-center"> <span
              class="material-symbols-outlined">language</span> <span class="ml-1">EN</span> <span
              class="material-symbols-outlined text-sm">expand_more</span> </summary>
            <div class="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden w-24 py-1 z-50"> <a
              href="#" class="block px-4 py-2 hover:bg-blue-50">English</a> <a href="#" class="block px-4 py-2 hover:bg-blue-50">Français</a>
              <a href="#" class="block px-4 py-2 hover:bg-blue-50">العربية</a> </div>
          </details>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors duration-300 flex items-center">
            <span class="material-symbols-outlined mr-1">account_circle</span> Sign In </button>
        </div>
      </div>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {

}
