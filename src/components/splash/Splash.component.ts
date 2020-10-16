import { Component, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'mil-splash',
  templateUrl: './Splash.component.html',
  styleUrls: ['./Splash.component.css']
})
export class SplashComponent {
  userName: string
  @Output() onClick = new EventEmitter<string>()

  public clickedPlayButton() {
    $('.center').animate({ opacity: 0}, () => this.onClick.emit(this.userName))
  }
}
