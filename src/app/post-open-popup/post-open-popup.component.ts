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
  @Output() updateData: EventEmitter<void> = new EventEmitter<void>();
  @Input() currentPost: any = {};

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    const token = this.authService.getToken();
    if (token) {
    } else {
      this.router.navigate(['/login']);
    }
  }

  postHackPosts() {
    console.log(this.currentPost);
    this.authService.postHackPosts(this.currentPost).subscribe(
      (response) => {
        console.log(response);
        this.close.emit();
        this.updateData.emit();
        this.currentPost = {};
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
        this.updateData.emit();
        this.close.emit();
        this.currentPost = {};
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Cancel(){
    this.close.emit();
    this.currentPost = {};
  }

}
