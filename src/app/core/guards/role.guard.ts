import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const userRole = authService.getUserRole();

  if (userRole === 'ROLE_ADMIN') {
    return true;
  } else {
    router.navigate(['/forbidden']);
    return false;
  }
};
