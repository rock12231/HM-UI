import { Component } from '@angular/core';
import { MessagePopupComponent } from '../message-popup/message-popup.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MessagePopupComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  

}
