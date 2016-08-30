import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/me/me-about.html'
})
export class MeAboutPage {
  constructor(private navController: NavController) {
  }

  goToPage() {
    console.log('hihihi');
  }
}
