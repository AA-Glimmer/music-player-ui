import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-genre-selection',
  templateUrl: './genre-selection.component.html',
  styleUrls: ['./genre-selection.component.css']
})
export class GenreSelectionComponent implements OnInit {

  baseUrl = this.global.baseUrl;

  constructor(private http: HttpClient, private router: Router,
              private sessionService: SessionService,  private global: GlobalService) {
  }

  orderableList = ['Rap', 'Hip Hop', 'Rock'];
  selectedGenres = '';
  username = null;
  password = null;

  ngOnInit() {
    const sesssion = this.sessionService.getSession();
    // Check if user is in session
    if (sesssion === undefined || !('user' in sesssion)) {
      // if not then redirect to login page
      this.router.navigate(['./login']);
    } else {
      this.username = sesssion['user']['username'];
      this.password = sesssion['user']['password'];
    }
  }


  confirmGenreOrdering() {
    for (let elem of this.orderableList) {
      this.selectedGenres = this.selectedGenres + elem + ',';
    }

    this.selectedGenres = this.selectedGenres.substring(0, this.selectedGenres.length - 1);
    console.log(this.selectedGenres);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/genreselection', JSON.stringify({
        username: this.username,
        password: this.password,
        genreSelection: this.selectedGenres,
      }))
        .toPromise()
        .then(
          data => {
            // console.log('Response ' + data);
            console.log('Navigating to to homepage...');
            this.router.navigate(['./homepage']);
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
