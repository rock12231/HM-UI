import { Component,ViewChild, ElementRef,EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-open-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-open-popup.component.html',
  styleUrl: './post-open-popup.component.css'
})
export class PostOpenPopupComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() currentPost: any = {};

  profileData: any = [];
  postData: any = [];
  // currentPost: any = {};
  isPostbtn: boolean = true;
  isUpdatebtn: boolean = false;
  isCancelbtn: boolean = false;

  postHackPosts(){}
  Update(){}
  Cancel(){
    this.close.emit();
    console.log("close");
  }

}
