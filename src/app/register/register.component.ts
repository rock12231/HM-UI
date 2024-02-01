import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  gid: string = 'rock12231';

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    console.log("RegisterComponent");
  }

  getGithubId(): void {
    if (this.gid.length > 30) {
      this.authService.getGithubId(this.gid).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  register(): void {
    this.authService.register(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        this.authService.setToken(response.access, response.refresh);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}



// {
//   "login": "rock12231",
//   "id": 37548802,
//   "node_id": "MDQ6VXNlcjM3NTQ4ODAy",
//   "avatar_url": "https://avatars.githubusercontent.com/u/37548802?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/rock12231",
//   "html_url": "https://github.com/rock12231",
//   "followers_url": "https://api.github.com/users/rock12231/followers",
//   "following_url": "https://api.github.com/users/rock12231/following{/other_user}",
//   "gists_url": "https://api.github.com/users/rock12231/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/rock12231/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/rock12231/subscriptions",
//   "organizations_url": "https://api.github.com/users/rock12231/orgs",
//   "repos_url": "https://api.github.com/users/rock12231/repos",
//   "events_url": "https://api.github.com/users/rock12231/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/rock12231/received_events",
//   "type": "User",
//   "site_admin": false,
//   "name": "Avinash Kumar",
//   "company": "Freelancing",
//   "blog": "coold.in",
//   "location": "India",
//   "email": null,
//   "hireable": null,
//   "bio": "Programmer | Developer | Learning | IoT | Robotics | Arduino & Pi",
//   "twitter_username": "rock12231",
//   "public_repos": 92,
//   "public_gists": 1,
//   "followers": 26,
//   "following": 22,
//   "created_at": "2018-03-19T15:51:43Z",
//   "updated_at": "2024-01-15T12:36:36Z"
// }
