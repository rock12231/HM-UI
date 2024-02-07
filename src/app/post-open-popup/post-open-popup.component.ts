import { Component,ViewChild, ElementRef,EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-post-open-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-open-popup.component.html',
  styleUrl: './post-open-popup.component.css'
})
export class PostOpenPopupComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() postSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Input() currentPost: any = {};

  profileData: any = [];
  postData: any = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    const token = this.authService.getToken();
    if (token) {
    } else {
      this.router.navigate(['/login']);
    }
  }

  postHackPosts() {
    this.authService.postHackPosts(this.currentPost).subscribe(
      (response) => {
        console.log(response);
        // hit the getHackPosts() method to get the updated data in hackposts component
        this.close.emit();
        // this.getHackPosts();
        this.postSuccess.emit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  Update(){
    this.authService.updateHackPosts(this.currentPost.id,this.currentPost).subscribe(
      (response) => {
        console.log(response);
        // this.getHackPosts();
        this.close.emit();
        this.postSuccess.emit();
      },
      (error) => {
        console.log(error);
      }
    );
    this.currentPost = {};
  }

  Cancel(){
    this.close.emit();
    console.log("close");
  }

}
