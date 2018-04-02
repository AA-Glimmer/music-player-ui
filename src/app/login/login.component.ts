import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = this.global.baseUrl;

  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router,
              private sessionService: SessionService, private global: GlobalService) {
  }

  ngOnInit() {
  }

  login(): void {
    console.log('login called');
    console.log(this.username);
    console.log(this.password);


    let request = JSON.stringify({
        "username": this.username,
        "password": this.password
      });

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login', request)
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
      this.http.post(this.baseUrl + '/signup', JSON.stringify({
        username: this.username,
        password: this.password
      }))
        .toPromise()
        .then(
          data => {
            // console.log('Response ' + data);
            console.log('Signup Success');

            let user = {user: {username: this.username, password: this.password}};
            this.sessionService.setSession(user);

            console.log(this.sessionService.getSession());

            this.router.navigate(['./genreselection']);
            resolve();
          },
          err => {
            // Error
            console.log('Error status: ' + err.status);
            alert(err.msg);
          }
        );
    });
  }

}
