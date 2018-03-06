import { Component, OnInit} from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isPlaying = false;
  sound = new Howl({src: ['../../assets/songs/temp.mp3']})

  togglePlay(event) {
    if(!this.isPlaying) {
      // If earlier song wasn't isPlaying
      this.isPlaying = true;

      this.sound.play()
    } else {
      this.isPlaying = false;
      this.sound.pause()
    }
  }


}
