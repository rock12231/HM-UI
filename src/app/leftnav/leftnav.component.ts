import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leftnav',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './leftnav.component.html',
  styleUrl: './leftnav.component.css'
})
export class LeftnavComponent {
  
  username: string | null | undefined='';
  photo: any;

  constructor(private authService: AuthenticationService) { 
    this.username = this.authService.getUsername();
  }

  ngOnInit() {
    this.showProfilePhoto();
  }

  showProfilePhoto() {
    this.authService.getProfilePhoto().subscribe(
      (response) => {
        console.log(response);
        this.photo = response.avatar;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
