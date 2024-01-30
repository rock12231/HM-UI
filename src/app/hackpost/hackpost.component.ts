import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-hackpost',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './hackpost.component.html',
  styleUrl: './hackpost.component.css'
})
export class HackpostComponent {

  title = 'HM-UI';
  ip: string | undefined;
  chart: any = []

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    if (this.authService.isAuthenticated()) {
      console.log("Authenticated HackpostComponent");
    } else {
      this.router.navigate(['/login']);
    }

  }


  // Get ip address
  getIPAddress() {
    this.http.get('https://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ip = res.ip;
      console.log(this.ip);
    });
  }

  // Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


// var ctx2 = $("#salse-revenue").get(0).getContext("2d");
// var myChart2 = new Chart(ctx2, {
//     type: "line",
//     data: {
//         labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
//         datasets: [{
//             label: "Salse",
//             data: [15, 30, 55, 45, 70, 65, 85],
//             backgroundColor: "rgba(235, 22, 22, .7)",
//             fill: true
//         },
//         {
//             label: "Revenue",
//             data: [99, 135, 170, 130, 190, 180, 270],
//             backgroundColor: "rgba(235, 22, 22, .5)",
//             fill: true
//         }
//         ]
//     },
//     options: {
//         responsive: true
//     }
// });
// });



  ngOnInit() {
    this.getIPAddress();
    this.chartData1();
    this.chartData2();
  }

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

}
