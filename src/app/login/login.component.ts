import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MytoastrService } from '../services/mytoastr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  email: string = '';
  password: string = '';

  constructor(private router: Router,private authService: AuthenticationService, private toastrService : MytoastrService) {
    console.log("LoginComponent");
  }

  ngOnInit(): void {
   
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.toastrService.showSuccess('LogIn Success', 'Success');
        console.log(response);
        this.authService.setToken(response.access, response.refresh);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log(error);
        this.toastrService.showError('LogIn Failed, Please check Credentials', 'Error');
      }
    );
  }

}