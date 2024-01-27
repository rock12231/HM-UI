import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HackpostComponent } from './hackpost/hackpost.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HackpostComponent },
    // { path: '',   redirectTo: '/login', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
];
