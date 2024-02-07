import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-popup',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './post-popup.component.html',
  styleUrl: './post-popup.component.css'
})
export class PostPopupComponent {
  @Input() postData: any;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
