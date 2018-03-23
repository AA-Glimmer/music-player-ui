import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = 'http://demo2919474.mockable.io';

  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router, private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  login(): void {
    console.log('login called');
    console.log(this.username);
    console.log(this.password);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login', {
        username: this.username,
        password: this.password
      })
        .toPromise()
        .then(
          data => {
            // console.log('Response ' + data);
            console.log('Login Success');

            let user = {user: {username: this.username, password: this.password}};
            this.sessionService.setSession(user);

            console.log(this.sessionService.getSession());

            this.router.navigate(['./homepage']);
            resolve();
          },
          err => {
            // Error
            console.log('Error status: ' + err.status);
            alert('Invalid Credentials');
          }
        );
    });
  }


  signup(): void {
    console.log('signup called');

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login', {
        username: this.username,
        password: this.password
      })
        .toPromise()
        .then(
          data => {
            // console.log('Response ' + data);
            console.log('Login Success');

            let user = {user: {username: this.username, password: this.password}};
            this.sessionService.setSession(user);

            console.log(this.sessionService.getSession());

            this.router.navigate(['./homepage']);
            resolve();
          },
          err => {
            // Error
            console.log('Error status: ' + err.status);
            alert('Invalid Credentials');
          }
        );
    });
  }

}
