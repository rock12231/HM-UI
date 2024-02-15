import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-hacklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hacklist.component.html',
  styleUrl: './hacklist.component.css'
})
export class HacklistComponent {

  hackList: any = [];
  token: string | null | undefined;
  constructor(private authService: AuthenticationService) {
    this.token = this.authService.getToken();
  }

  ngOnInit() {
    this.hackListData();
  }

  hackListData() {
    this.authService.hackeathonData().subscribe((response) => {
      this.hackList = response;
    },);
  }

}
