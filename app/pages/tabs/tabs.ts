import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {TimelinePage} from '../timeline/timeline';
import {MePage} from '../me/me';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  mySelectedIndex: number;

  timelineRoot: any = TimelinePage;
  meRoot: any = MePage;


  //
  //
  constructor(navParams: NavParams) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.timelineRoot = TimelinePage;
    this.meRoot = MePage;

    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
