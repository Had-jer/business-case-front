import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // 🔥 URLs publiques (pas de token ici)
  const publicUrls = [
    '/api/login',
    '/api/register'
  ];

  // ❗ Si l’URL fait partie des routes publiques → NE PAS ajouter de token
  if (publicUrls.some(url => req.url.includes(url))) {
    console.log("➡️ Public route, no token sent.");
    return next(req);
  }

  const token = auth.getToken();
  console.log('INTERCEPTOR TOKEN =', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
