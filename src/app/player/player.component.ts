import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Howl } from 'howler';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';
import {GlobalService} from '../services/global.service';

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

  sound = null;
  soundId = null;
  songId = null;
  songURL = null;
  isLike = false;
  username = null;

  ngOnInit() {

    const sesssion = this.sessionService.getSession();
    // Check if user is in session
    if (sesssion === undefined || !('user' in sesssion)) {
      // if not then redirect to login page
      this.router.navigate(['./login']);
    } else {
      this.username = sesssion['user']['username'];
    }



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


  isPlaying = false;
  //sound = new Howl({src: ['../../assets/songs/temp.mp3']})

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
}
