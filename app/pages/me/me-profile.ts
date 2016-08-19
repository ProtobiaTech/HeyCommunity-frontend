import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/me/me-profile.html'
})
export class MeProfilePage {
  constructor(private navController: NavController) {
  }

  goToPage() {
    console.log('hihihi');
  }
}
