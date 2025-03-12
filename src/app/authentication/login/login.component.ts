import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ RouterLink],
  template: `
  <div id="webcrumbs">
  <div class="w-[480px] bg-gradient-to-br from-blue-900 to-yellow-500 rounded-lg shadow-xl overflow-hidden mx-auto">
      <div class="p-8">
          <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-white mb-2">Morocco Adventures</h1>
              <p class="text-white/80 text-sm">Sign in to reserve your next Moroccan adventure</p>
          </div>
          <div class="bg-white/20 bg-opacity-10 backdrop-blur-sm  rounded-lg p-6 border border-white/20">
              <form>
                  <div class="mb-4">
                      <label for="email" class="block text-white text-sm font-medium mb-1">Email</label>
                      <div class="relative">
                          <span
                              class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                          >
                              mail
                          </span>
                          <input
                              type="email"
                              id="email"
                              class="w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                              placeholder="Your email address"
                              required=""
                          />
                      </div>
                  </div>
                  <div class="mb-6">
                      <div class="flex items-center justify-between mb-1">
                          <label for="password" class="block text-white text-sm font-medium">Password</label>
                          <a
                              href="#"
                              class="text-xs text-white/70 hover:text-white transition-colors duration-300"
                              >Forgot password?</a
                          >
                      </div>
                      <div class="relative">
                          <span
                              class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
                          >
                              lock
                          </span>
                          <input
                              type="password"
                              id="password"
                              class="w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                              placeholder="Your password"
                              required=""
                          />
                      </div>
                  </div>
                  <div class="mb-6">
                      <label class="flex items-center">
                          <input
                              type="checkbox"
                              class="w-4 h-4 rounded border-white/30 text-yellow-500 focus:ring-yellow-500 focus:ring-opacity-50 bg-white/20"
                          />
                          <span class="ml-2 text-sm text-white/80">Keep me signed in</span>
                      </label>
                  </div>
                  <button
                      type="submit"
                      class="w-full bg-white hover:bg-opacity-90 active:bg-opacity-80 text-blue-900 font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                      Sign In
                  </button>
              </form>
          </div>
          <div class="mt-6 text-center">
              <p class="text-white/80 text-sm">
                  Don&#x27;t have an account?
                  <a routerLink="/authentication/register" class="text-white font-medium ml-1 hover:underline transition-all duration-300"
                      >Register now</a
                  >
              </p>
          </div>
      </div>
  </div>
</div>
`,
  styles: ``
})
export class LoginComponent {

}
