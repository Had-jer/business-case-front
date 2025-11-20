import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
    title: 'HealthCloud — Accueil',
  },
  {
    path: 'sinscrire',
    loadComponent: () => import('./pages/sinscrire-page/sinscrire').then((m) => m.SinscrirePage),
    title: "S'inscrire",
  },
  {
    path: 'connexion',
    loadComponent: () => import('./pages/se-connecter/se-connecter').then(m => m.SeConnecter),
    title: 'Connexion',
  },

  {
    path: 'user/profile',
    loadComponent: () =>
      import('./pages/user-profile/user-profile').then(m => m.UserProfile),
    title: 'Profil Patient'
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile-page/edit-profile-page')
        .then(m => m.EditProfilePageComponent)
  },

  {
    path: 'doctor/profile',
    loadComponent: () =>
      import('./pages/doctor-profile/doctor-profile').then(m => m.DoctorProfile),
    title: 'Profil Médecin'
  },
  {
    path: 'medical-event',
    loadComponent: () =>
      import('./pages/medical-event/medical-event').then(m => m.MedicalEventPage),
    title: "Créer un événement médical"
  },
  {
    path: 'medical-event/:id',
    loadComponent: () => import('./pages/medical-event-details/medical-event-details')
      .then(m => m.MedicalEventDetailsPage)
  },
  
  // {
  //   path: 'medical-event/edit/:id',
  //   loadComponent: () =>
  //     import('./pages/medical-event-edit/medical-event-edit')
  //       .then(m => m.MedicalEventEditPage),
  //   title: 'Modifier un événement'
  // },
  // {
  //   path: 'medical-event/show/:id',
  //   loadComponent: () =>
  //     import('./pages/medical-event-show/medical-event-show')
  //       .then(m => m.MedicalEventShowPage),
  //   title: 'Détails événement'
  // }
  
  //
  // {
  //   path: 'medical-event/edit/:id',
  //   loadComponent: () =>
  //     import('./pages/medical-event-edit/medical-event-edit')
  //       .then(m => m.MedicalEventEditPage),
  //   title: 'Modifier un événement',
  // },
];
