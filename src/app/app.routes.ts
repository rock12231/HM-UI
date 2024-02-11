import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HackpostComponent } from './hackpost/hackpost.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { HmFrameComponent } from './hm-frame/hm-frame.component';

export const routes: Routes = [
    // { path: '', component: HmFrameComponent }, make this component common in hackpost and profile 
    // { path: '', component: HackpostComponent },
    // Lazy loading
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forget-pass', component: ForgetPasswordComponent },
    // { path: 'open-post', component: OpenPostComponent}
    // { path: '',   redirectTo: '/login', pathMatch: 'full' },
    
    { 
        path: '', component: HmFrameComponent, canActivate: [AuthGuard], // Use ParentComponent for the default path
        children: [
            { path: 'feed', component: HackpostComponent, canActivate: [AuthGuard] }, // Default child route
            // { path: '', loadChildren: () => import('./hackpost/hackpost.component').then(m => m.HackpostComponent)},
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
            // { path: 'profile', loadChildren: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
            { path: 'publicprofile', component: PublicProfileComponent, canActivate: [AuthGuard]},
            // { path: 'publicprofile', loadChildren: () => import('./public-profile/public-profile.component').then(m => m.PublicProfileComponent) },
            { path: 'about', component: AboutComponent },
            // { path: 'about', loadChildren: () => import('./about/about.component').then(m => m.AboutComponent) },
            { path: 'notfound', component: PageNotFoundComponent },
            // { path: 'notfound', loadChildren: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) },
            { path: '**', redirectTo: '/notfound' },
            // { path: '**', loadChildren: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
        ]
      },


];
