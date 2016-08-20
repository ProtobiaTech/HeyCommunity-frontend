import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/me/me-notice.html'
})
export class MeNoticePage {
  constructor(private navController: NavController) {
  }

  goToPage() {
    console.log('hihihi');
  }
}
