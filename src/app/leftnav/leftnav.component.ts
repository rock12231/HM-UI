import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../services/profile.service';
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

  profileData: any = []
  constructor(private router: Router, private authService: AuthenticationService, private profileService: ProfileService) { 

   this.profileData = this.profileService.getProfile().subscribe((res: any) => {
      this.profileData = res;
      console.log("Profile Data : >>>>>", this.profileData);
    });


  }

}
