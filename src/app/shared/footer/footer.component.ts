import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
  <footer class="bg-blue-900 text-white px-8 py-12">
  <div class="grid grid-cols-1 items-end md:grid-cols-3 gap-8 mb-12">
      <h3 class="text-xl font-bold mb-4 flex items-center"> <span
          class="material-symbols-outlined mr-2 text-yellow-400">explore</span> MoroccoExplore </h3>
      <p class="text-blue-100 mb-4">Your gateway to authentic Moroccan experiences. We offer carefully curated
        activities to help you discover the true essence of Morocco.</p>
      <div class="flex items-end justify-end  gap-4"> 
        <a href="#"
          class="bg-blue-700 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <i class="fa-brands fa-facebook-f"></i> </a> <a href="#"
          class="bg-blue-700 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <i class="fa-brands fa-instagram"></i> </a> <a href="#"
          class="bg-blue-700 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <i class="fa-brands fa-twitter"></i> </a> <a href="#"
          class="bg-blue-700 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <i class="fa-brands fa-youtube"></i> 
        </a> 
      </div>
  </div>
</footer>`,
  styles: ``
})
export class FooterComponent {

}
