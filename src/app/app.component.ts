import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HackpostComponent } from './hackpost/hackpost.component';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,RouterOutlet, HackpostComponent, LoginComponent,HackpostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HM-UI';
  constructor() {}
}
