import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  email: string = '';
  ShowForgetPassword: boolean = true;

  new_password: string = '';
  confirm_password: string = '';
  otp: string = '';

  constructor(private router: Router, private authService: AuthenticationService) {
    console.log("Forget Password Component");
  }

  forgotPass() {
    console.log(this.email);
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        console.log(response);
        this.ShowForgetPassword = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ResetPass(): void {
    console.log(this.new_password);
    console.log(this.confirm_password);
    console.log(typeof(this.otp));
    if (this.new_password === this.confirm_password) {
      const otp = parseInt(this.otp);
      console.log(typeof(otp));
      this.authService.resetPassword(this.email, otp, this.new_password).subscribe(
        (response) => {
          console.log(response);
          this.email = '';
          this.new_password = '';
          this.confirm_password = '';
          this.otp = '';
          this.ShowForgetPassword = true;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
