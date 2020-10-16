import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'mil-splash',
  templateUrl: './Splash.component.html',
  styleUrls: ['./Splash.component.css']
})
export class SplashComponent {
  userName: string

  constructor(private router: Router) { }

  public clickedPlayButton() {
    $('.center').animate({ opacity: 0}, () => 
    this.router.navigate(['/gameboard'], {queryParams: {userName: this.userName}}))
  }
}
