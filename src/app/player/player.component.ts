import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Howl } from 'howler';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { GlobalService } from '../services/global.service';
import { Chart } from 'chart.js';

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

  ngOnInit() {

    // const sesssion = this.sessionService.getSession();
    // // Check if user is in session
    // if (sesssion === undefined || !('user' in sesssion)) {
    //   // if not then redirect to login page
    //   this.router.navigate(['./login']);
    // } else {
    //   this.username = sesssion['user']['username'];
    // }


    this.renderUserModel()


    // on page refresh request for a song from the server.
    // Serve will provide the song name and then play the song directly
    // from that location
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/song')
      .toPromise()
      .then (
        data => {
          this.songId = data['songId'];
          this.songURL = data['url'];
          this.sound = new Howl({src: this.songURL});
          resolve();
         },
         err => { // Error
         //reject(err);
         alert(err.status);
         }
       );
     });
  }


   togglePlay(event) {
    if ( !this.isPlaying) {
      // If earlier song wasn't isPlaying
      //this.isPlaying = true;
      //this.soundId = this.sound.play()
      this.playSong()

    } else {
      this.isPlaying = false;
      this.sound.pause();
      console.log();
    }
  }


   skipSong(event) {
    console.log('Skipping Song:' + this.songURL);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/skip', {
        songId: this.songId,
        isLike: this.isLike,
        timePlayed : this.sound.seek(this.soundId),
        timestamp: new Date().getTime() / 1000,
      })
      .toPromise()
      .then (
        data => {
          // Stop the previous song
          this.sound.stop();

          // set the next song
          this.songId = data['songId'];
          this.songURL = data['url'];
          //this.mood = data['mood'];
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

   playNextSong() {
      let promise = new Promise((resolve, reject) => {
        this.http.post(this.baseUrl+'/song', {
          songId: this.songId,
          isLike: this.isLike,
          timePlayed : this.sound.seek(this.soundId),
          timestamp: new Date().getTime() / 1000,
        })
        .toPromise()
        .then (
          data => {
            // Stop the previous song
            this.sound.stop();

            // set the next song
            this.songId = data['songId'];
            this.songURL = data['url'];
            //this.mood = mood;
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

    // Fires when the sound finishes playing.
    this.sound.on('end', function() {
      console.log('Finished playing song! Playing next song.');
      this.playNextSong();
    });
  }


  renderUserModel() {
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
          data: [0.5, 0.6, 0.3, 0.4, 0.6, 0.7],
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
