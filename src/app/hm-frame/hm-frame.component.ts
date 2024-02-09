import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { PostOpenPopupComponent } from '../post-open-popup/post-open-popup.component';
import { PostPopupComponent } from '../post-popup/post-popup.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { HackpostComponent } from '../hackpost/hackpost.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hm-frame',
  standalone: true,
  imports: [CommonModule, FormsModule, LeftnavComponent, TopnavComponent,
     PostPopupComponent, PostOpenPopupComponent,HackpostComponent, ProfileComponent,RouterOutlet],
  templateUrl: './hm-frame.component.html',
  styleUrl: './hm-frame.component.css'
})
export class HmFrameComponent  implements OnInit{

  // path: string = '/';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.events.subscribe(event => {
      // if (event instanceof NavigationEnd) {
        // this.path = this.router.url;
        // console.log(this.path);
      // }
    // });
  }

}
