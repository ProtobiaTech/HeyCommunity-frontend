import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/me/me-timeline.html'
})
export class MeTimelinePage {
  constructor(private navController: NavController) {
  }

  goToPage() {
    console.log('hihihi');
  }
}
