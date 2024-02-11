import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { PostOpenPopupComponent } from '../post-open-popup/post-open-popup.component';
import { PostPopupComponent } from '../post-popup/post-popup.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { HackpostComponent } from '../hackpost/hackpost.component';
import { ProfileComponent } from '../profile/profile.component';
import { Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-hm-frame',
  standalone: true,
  imports: [CommonModule, FormsModule, LeftnavComponent, TopnavComponent,SpinnerComponent,
     PostPopupComponent, PostOpenPopupComponent,HackpostComponent, ProfileComponent,RouterOutlet],
  templateUrl: './hm-frame.component.html',
  styleUrl: './hm-frame.component.css'
})
export class HmFrameComponent  implements OnInit{

  loading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 600);
  }
}
