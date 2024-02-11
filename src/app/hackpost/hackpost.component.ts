import { Component,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftnavComponent } from '../leftnav/leftnav.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { PostPopupComponent } from '../post-popup/post-popup.component';
import { PostOpenPopupComponent } from '../post-open-popup/post-open-popup.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-hackpost',
  standalone: true,
  imports: [CommonModule, FormsModule, LeftnavComponent, TopnavComponent, PostPopupComponent, PostOpenPopupComponent,
  SpinnerComponent],
  templateUrl: './hackpost.component.html',
  styleUrl: './hackpost.component.css'
})
export class HackpostComponent {

  // @ViewChild('target') target: ElementRef | undefined;
  isSidebarOpen: boolean = false;
  searchTopic:string = '';
  searchType:string = '';

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  title = 'Landing Page';
  postData: any = [];
  token: string | null | undefined;
  currentPost: any = {};
  isPostbtn: boolean = true;
  isUpdatebtn: boolean = false;
  isCancelbtn: boolean = false;
  showPostPopup: boolean = false;
  hData: any = [];

  page: number = 1;
  pageSize: number = 10;
  loading: boolean = false;
  totalItems: number = 0;

  constructor(private http: HttpClient, private router: Router,
     private authService: AuthenticationService,
     private spinnerService: SpinnerService) {
    this.spinnerService.show();
    this.token = this.authService.getToken();
  }


  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.hide();
    }, 300);
    if (this.token) {
      this.getHackPosts();
      this.hackathon();
    }
  }

  clearVal() {
    this.searchTopic = '';
    this.searchType = '';
    this.getHackPosts();
  }

  getHackPosts() {
    this.authService.getHackPosts(this.page, this.pageSize).subscribe((response) => {
      console.log(response, "<<<< all posts");
      this.postData = JSON.parse(JSON.stringify(response.results));
      this.loading = false;
      this.totalItems = response.count;
      // this.page++;
    },
      (error) => { console.log(error); });
      this.loading = true;
  }

  loadMore() {
    if (!this.loading && 10*this.page >= this.totalItems) {
      this.getHackPosts();
    }
  }

  getSearchedPosts() {
    if(this.searchTopic.length > 3 || this.searchType !== null) {
      this.authService.searchHackPosts(this.searchTopic, this.searchType).subscribe((response) => {
        console.log(response, "<<<< all search posts");
        this.postData = JSON.parse(JSON.stringify(response));
      },
        (error) => { console.log(error); });
    }
  }

  Cancel(){
    this.currentPost = {};
    this.isPostbtn = true;
    this.isUpdatebtn = false;
    this.isCancelbtn = false;
  }


  postLike(id:number){
    const postId = id
    // this.page--;
    this.authService.postLike(postId).subscribe((response) => {
      this.getHackPosts();
    },
      (error) => { console.log(error); });
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

 // hackathon data
 hackathon() {
  this.authService.hackeathonData().subscribe((response) => {
    this.hData = JSON.parse(JSON.stringify(response));
    console.log(response, "<<<< hackathon data");
  },);
}

// For new and edit posts emit from child component popup
updateData() {
  this.getHackPosts();
}


// For Read Posts
  openPopup(item : any) {
    item.showPopup = true;
  }

  closePopup(item : any) {
    item.showPopup = false;
  }

  // For new and edit posts
  openPostPopup() {
    this.showPostPopup = true;
    this.currentPost['isPostbtn'] = true;
  }

  closePostPopup() {
    this.showPostPopup = false;
    this.currentPost = {};
  }

  editPostPopup(item : any) {
    this.showPostPopup = true;
  }

  openPostPopupData(item : any) {
    this.currentPost = item;
    this.showPostPopup = true;
    this.currentPost['isPostbtn'] = false;
    this.currentPost['isUpdatebtn'] = true;
  }

  
}

// chart: any = []
// chartData1() {
//   this.chart = new Chart('worldwide-sales', {
//     type: "bar",
//     data: {
//       labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
//       datasets: [{
//         label: "USA",
//         data: [15, 30, 55, 65, 60, 80, 95],
//         backgroundColor: "rgba(235, 22, 22, .7)"
//       },
//       {
//         label: "UK",
//         data: [8, 35, 40, 60, 70, 55, 75],
//         backgroundColor: "rgba(235, 22, 22, .5)"
//       },
//       {
//         label: "AU",
//         data: [12, 25, 45, 55, 65, 70, 60],
//         backgroundColor: "rgba(235, 22, 22, .3)"
//       }
//       ]
//     },
//     options: {
//       responsive: true
//     }
//   });
// }

// chartData2() {
//   this.chart = new Chart('salse-revenue', {
//     type: "line",
//     data: {
//       labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
//       datasets: [{
//         label: "Salse",
//         data: [15, 30, 55, 45, 70, 65, 85],
//         backgroundColor: "rgba(235, 22, 22, .7)",
//         fill: true
//       },
//       {
//         label: "Revenue",
//         data: [99, 135, 170, 130, 190, 180, 270],
//         backgroundColor: "rgba(235, 22, 22, .5)",
//         fill: true
//       }
//       ]
//     },
//     options: {
//       responsive: true
//     }
//   });
// }