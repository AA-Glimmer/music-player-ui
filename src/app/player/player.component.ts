import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Howl} from 'howler';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';
import {GlobalService} from '../services/global.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {

  baseUrl = this.global.baseUrl;

  constructor(private http: HttpClient, private router: Router,
              private sessionService: SessionService, private global: GlobalService) {
  }

  chart: any;
  ctx: any;
  sound = null;
  soundId = null;
  songId = null;
  songURL = null;
  isLike = false;
  isPlaying = false;
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


    // on page refresh request for a song from the server.
    // Serve will provide the song name and then play the song directly
    // from that location
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/song/initial', JSON.stringify({
        username: this.username,
        password: this.password
      }))
        .toPromise()
        .then(
          data => {
            // Stop the previous song
            console.log(data);
            // set the next song
            this.songId = data['songId'];
            this.songURL = data['songURL'];

            let arr = [];
            arr[0] = this.songURL;
            this.sound = new Howl({src: arr});

            this.getUserModel();
            resolve();
          },
          err => {
            // Error
            //alert(err.status);
          }
        );
    });
  }

  togglePlay(event) {
    if (!this.isPlaying) {
      // If earlier song wasn't isPlaying

      this.playSong();

    } else {
      this.isPlaying = false;
      this.sound.pause();
      console.log();
    }
  }

  like() {
    this.isLike = true;
  }

  skipSong(event) {
    console.log('Skipping Song:' + this.songURL);
    let req = JSON.stringify({
      username: this.username,
      password: this.password,
      songId: this.songId,
      isLike: this.isLike,
      timePlayed: this.sound.seek(this.soundId),
      timestamp: new Date().getTime() / 1000,
    });
    console.log(req);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/song/skip', req)
        .toPromise()
        .then(
          data => {
            // Stop the previous song
            this.sound.stop();

            // set the next song
            this.songId = data['songId'];
            this.songURL = data['songURL'];
            this.isLike = false;
            let arr = [];
            arr[0] = this.songURL;

            console.log('Next Song:' + this.songURL);
            this.sound = new Howl({src: arr});

            // play the next song
            this.playSong();

            this.getUserModel();
            resolve();
          },
          err => {
            // Error
            alert(err.status);
          }
        );
    });
  }

  playNextSongNormally() {
    this.getUserModel();
    this.playNextSong();
  }

  playNextSong() {

    let req = JSON.stringify({
      username: this.username,
      password: this.password,
      songId: this.songId,
      isLike: this.isLike,
      timePlayed: this.sound.seek(this.soundId),
      timestamp: new Date().getTime() / 1000,
    });

    console.log('Play next song');
    console.log(req);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/song', req)
        .toPromise()
        .then(
          data => {
            // Stop the previous song
            this.sound.stop();

            // set the next song
            this.songId = data['songId'];
            this.songURL = data['songURL'];
            this.isLike = false;

            console.log('Next Song:' + this.songURL);
            this.sound = new Howl({
              src: this.songURL,
              onend: function() {
                this.src.playNextSong();
              }
            });

            // play the next song
            this.playSong();
            resolve();
          },
          err => {
            // Error
            alert(err.status);
          }
        );
    });
  }

  hate() {
    console.log('SONG ID: ' + this.songId);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/song/hate', JSON.stringify({
        username: this.username,
        password: this.password,
        songId: this.songId,
        timePlayed: this.sound.seek(this.soundId),
        timestamp: new Date().getTime() / 1000,
      }))
        .toPromise()
        .then(
          data => {
            // Stop the previous song
            this.sound.stop();

            // set the next song
            this.songId = data['songId'];
            this.songURL = data['songURL'];
            this.isLike = false;

            console.log('Next Song:' + this.songURL);
            this.sound = new Howl({src: this.songURL});

            // play the next song
            this.playSong();
            resolve();
          },
          err => {
            // Error
            alert(err.status);
          }
        );
    });
  }


  // Helper method that plays the song
  playSong() {
    this.isPlaying = true;
    this.soundId = this.sound.play();
    console.log('In Play Function');

  }


  getUserModel() {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/user/usermodel', JSON.stringify({
          username: this.username,
          password: this.password,
        })
      )
        .toPromise()
        .then(
          data => {
            const happy = data['Happy'];
            const angry = data['Angry'];
            const sad = data['Sad'];
            const anx = data['Anxious'];
            const loving = data['Loving'];
            const fearful = data['Fearful'];
            this.renderUserModel([happy, angry, sad, anx, loving, fearful]);

            resolve();
          },
          err => {
            // Error
            alert(err.status);
          }
        );
    });
  }

  renderUserModel(userData) {

    console.log(userData)

    this.ctx = document.getElementById('userModelChart');

    this.chart = new Chart(this.ctx, {
      type: 'radar',
      data: {
        labels: ['Happy', 'Angry', 'Sad', 'Anxious', 'Loving', 'Fearful'],
        datasets: [{
          label: 'User Model',
          backgroundColor: 'rgba(0, 153, 247,.5)',
          borderColor: 'rgba(0, 153, 247,1)',
          pointBackgroundColor: 'rgba(0, 153, 247,1)',
          pointBorderColor: 'rgba(0, 153, 247,1)',
          pointHoverBackgroundColor: 'rgba(0, 153, 247,1)',
          pointHoverBorderColor: 'rgba(0, 153, 247,1)',
          // data: [0.5, 0.6, 0.3, 0.4, 0.6, 0.7],
          data: userData,
        }]
      },
      options: {
        scale: {
          // Hides the scale
          display: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 1,
          }
        }
      }
    });
  }
}
