import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {TimelinePage} from '../timeline/timeline';
import {MePage} from '../me/me';
import {TopicPage} from '../topic/topic';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  mySelectedIndex: number;

  timelineRoot: any = TimelinePage;
  meRoot: any = MePage;
  homeRoot: any = HomePage;
  aboutRoot: any = AboutPage;


  //
  //
  constructor(navParams: NavParams) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.timelineRoot = TimelinePage;
    this.meRoot = MePage;
    this.homeRoot = HomePage;
    this.aboutRoot = AboutPage;

    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
