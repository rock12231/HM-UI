import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HackpostComponent } from './hackpost/hackpost.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AboutComponent } from './about/about.component';
import { OpenPostComponent } from './open-post/open-post.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

export const routes: Routes = [
    { path: '', component: HackpostComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'notfound', component: PageNotFoundComponent },
    // { path: '**', redirectTo: '/notfound' },
    { path: 'forget-pass', component: ForgetPasswordComponent },
    { path: 'about', component: AboutComponent },
    // { path: 'open-post', component: OpenPostComponent}
    { path: 'publicprofile', component: PublicProfileComponent}
    
    // { path: '',   redirectTo: '/login', pathMatch: 'full' },
];
