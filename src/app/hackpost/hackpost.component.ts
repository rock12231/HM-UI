import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hackpost',
  standalone: true,
  imports: [ HttpClientModule],
  templateUrl: './hackpost.component.html',
  styleUrl: './hackpost.component.css'
})
export class HackpostComponent {
  title = 'HM-UI';
  ip: string | undefined;

  constructor(private http: HttpClient) {
    this.getIPAddress();
  }

  // Get ip address
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ip = res.ip;
      console.log(this.ip);
    });
  }
}
