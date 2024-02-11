import { Component, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  page: number = 1;
  pageSize: number = 10;

  constructor(private authService: AuthenticationService) { }

  text: string = '';
  hashtagSuggestions: string[] = [];

  onInputChange(event: any) {
    const inputText = event.target.value;
    this.hashtagSuggestions = this.getHashtagSuggestions(inputText);
  }

  getHashtagSuggestions(inputText: string): string[] {
    // Example logic to generate suggestions based on input text
    // In a real scenario, this might involve querying a backend API or local data
    const suggestions = [
      'angular',
      'javascript',
      'typescript',
      'react',
      'vue',
      'frontend',
      'backend',
      'webdev',
      'coding',
      'programming'
    ];

    // Filter suggestions based on input text
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputText.toLowerCase())
    );
  }

  selectSuggestion(suggestion: string) {
    // Append the selected suggestion to the text in the textarea
    this.text += suggestion + ' ';
  }

  postHackPosts() {
    console.log(this.currentPost);
    this.authService.postHackPosts(this.page, this.pageSize, this.currentPost).subscribe(
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

  Update() {
    this.authService.updateHackPosts(this.currentPost.id, this.currentPost).subscribe(
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

  Cancel() {
    this.close.emit();
    this.currentPost = {};
  }

}
