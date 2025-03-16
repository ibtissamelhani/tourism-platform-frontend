import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ RouterLink],
  template: `
    <div class = "container mx-auto  p-7.5 flex justify-center">
      <div class = "w-[700px] bg-gradient-to-br from-blue-900 to-yellow-500 rounded-lg shadow-xl overflow-hidden">
        <div class = "p-8">
          <div class = "text-center mb-8">
            <h1 class = "text-3xl font-bold text-white mb-2">DadesAdventures</h1>
            <p class = "text-white/80 text-sm">Create an account to explore Moroccan destinations</p>
          </div>

          <div class = "bg-white/20 bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <form>
              <div class = "grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" class = "block text-white text-sm font-medium mb-1">First Name</label>
                  <div class = "relative">
                  <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                    person
                  </span>
                    <input
                      type="text"
                      id="firstName"
                      class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="First name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" class = "block text-white text-sm font-medium mb-1">Last Name</label>
                  <div class = "relative">
                  <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                    badge
                  </span>
                    <input
                      type="text"
                      id="lastName"
                      class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class = "grid grid-cols-2 gap-4 mb-4">
              <div >
                <label htmlFor="email" class = "block text-white text-sm font-medium mb-1">Email</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  mail
                </span>
                  <input
                    type="email"
                    id="email"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>

              <div class >
                <label htmlFor="phone" class = "block text-white text-sm font-medium mb-1">Phone Number</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  phone
                </span>
                  <input
                    type="tel"
                    id="phone"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <p class = "text-white/60 text-xs mt-1">Include country code (e.g., +212 for Morocco)</p>
              </div>
              </div>

              <div class = "grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="password" class = "block text-white text-sm font-medium mb-1">Password</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  lock
                </span>
                  <input
                    type="password"
                    id="password"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <p class = "text-white/60 text-xs mt-1">Password must be at least 8 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" class = "block text-white text-sm font-medium mb-1">Confirm Password</label>
                <div class = "relative">
                <span class = "material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                  lock_reset
                </span>
                  <input
                    type="password"
                    id="confirmPassword"
                    class = "w-full bg-white/20 border border-white/30 rounded-lg py-2.5 pl-10 pr-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
              </div>

              <div class = "flex items-end justify-between">
              
              <button
                type="submit"
                class = "w-1/2  bg-blue-900 hover:bg-opacity-90 active:bg-opacity-80 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:bg-blue-800"
              >
                Create Account
              </button>
              <p class = "text-white/80 text-sm">
              Already have an account?
              <a routerLink="/authentication/login" class = "text-white font-medium ml-1 hover:underline transition-all duration-300">Sign in</a>
            </p>
              </div>
            </form>
          </div>          
        </div>
      </div>
    </div>
    `,
  styles: ``
})
export class RegisterComponent {

}
