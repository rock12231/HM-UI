import { Component,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { PostPopupComponent } from '../post-popup/post-popup.component';
import { PostOpenPopupComponent } from '../post-open-popup/post-open-popup.component';

@Component({
  selector: 'app-hackpost',
  standalone: true,
  imports: [CommonModule, FormsModule, LeftnavComponent, TopnavComponent, PostPopupComponent, PostOpenPopupComponent],
  templateUrl: './hackpost.component.html',
  styleUrl: './hackpost.component.css'
})
export class HackpostComponent {

  @ViewChild('target') target: ElementRef | undefined;

  title = 'HM-UI';
  ip: string | undefined;
  chart: any = []
  profileData: any = [];
  postData: any = [];
  token: string | null | undefined;
  currentPost: any = {};
  isPostbtn: boolean = true;
  isUpdatebtn: boolean = false;
  isCancelbtn: boolean = false;
  showPostPopup: boolean = false;


  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    this.token = this.authService.getToken();
    if (this.token) {
      this.getHackPosts();
    } else {
      this.router.navigate(['/login']);
    }

  }

  ngOnInit() {
    // this.getIPAddress();
    // this.chartData1();
    // this.chartData2();
    // if (this.token) {
    //   console.log("Profile Token : >>>>>", this.token);
    //   this.profile();
    // }
  }

  getHackPosts() {
    this.authService.getHackPosts().subscribe((response) => {
      console.log(response, "<<<< profile data");
      this.postData = JSON.parse(JSON.stringify(response));
    },
      (error) => { console.log(error); });
  }

  postHackPosts() {
    this.authService.postHackPosts(this.currentPost).subscribe(
      (response) => {
        console.log(response);
        this.getHackPosts();
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
        this.getHackPosts();
      },
      (error) => {
        console.log(error);
      }
    );
    this.currentPost = {};
  }

  Cancel(){
    this.currentPost = {};
    this.isPostbtn = true;
    this.isUpdatebtn = false;
    this.isCancelbtn = false;
  }

  updateHackPosts(data: any) {
    this.currentPost = data;
    this.isPostbtn = false;
    this.isUpdatebtn = true;
    this.isCancelbtn = true;
    // if (this.target && this.target.nativeElement) {
    //   this.target.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    // }
  }

  deleteHackPosts(id: any) {
    this.authService.deleteHackPosts(id,this.currentPost).subscribe(
      (response) => {
        console.log(response);
        this.getHackPosts();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // getIPAddress() {
  //   this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
  //     this.ip = res.ip;
  //     console.log(this.ip);
  //   });
  // }

  chartData1() {
    this.chart = new Chart('worldwide-sales', {
      type: "bar",
      data: {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [{
          label: "USA",
          data: [15, 30, 55, 65, 60, 80, 95],
          backgroundColor: "rgba(235, 22, 22, .7)"
        },
        {
          label: "UK",
          data: [8, 35, 40, 60, 70, 55, 75],
          backgroundColor: "rgba(235, 22, 22, .5)"
        },
        {
          label: "AU",
          data: [12, 25, 45, 55, 65, 70, 60],
          backgroundColor: "rgba(235, 22, 22, .3)"
        }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  chartData2() {
    this.chart = new Chart('salse-revenue', {
      type: "line",
      data: {
        labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [{
          label: "Salse",
          data: [15, 30, 55, 45, 70, 65, 85],
          backgroundColor: "rgba(235, 22, 22, .7)",
          fill: true
        },
        {
          label: "Revenue",
          data: [99, 135, 170, 130, 190, 180, 270],
          backgroundColor: "rgba(235, 22, 22, .5)",
          fill: true
        }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  // profile() {
  //   this.profileService.getProfile().subscribe(
  //     (response) => {
  //       console.log(response, "<<<< profile data");
  //       this.profileData = JSON.parse(JSON.stringify(response));
  //       localStorage.setItem('profile', this.profileData);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }


  openPopup(item : any) {
    item.showPopup = true;
  }

  closePopup(item : any) {
    item.showPopup = false;
  }




  openPostPopup() {
    this.showPostPopup = true;
  }

  closePostPopup() {
    this.showPostPopup = false;
  }

  editPostPopup(item : any) {
    this.showPostPopup = true;
  }

  openPostPopupData(item : any) {
    this.currentPost = item;
    this.showPostPopup = true;
  }



  
}
