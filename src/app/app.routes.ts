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
import { HmFrameComponent } from './hm-frame/hm-frame.component';

export const routes: Routes = [
    // { path: '', component: HmFrameComponent }, make this component common in hackpost and profile 
    // { path: '', component: HackpostComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forget-pass', component: ForgetPasswordComponent },
    // { path: 'open-post', component: OpenPostComponent}
    // { path: '',   redirectTo: '/login', pathMatch: 'full' },
    
    { 
        path: '', component: HmFrameComponent, // Use ParentComponent for the default path
        children: [
            { path: '', component: HackpostComponent }, // Default child route
            { path: 'profile', component: ProfileComponent },
            { path: 'publicprofile', component: PublicProfileComponent},
            { path: 'about', component: AboutComponent },

            { path: 'notfound', component: PageNotFoundComponent },
            { path: '**', redirectTo: '/notfound' },

            
        ]
      },


];
