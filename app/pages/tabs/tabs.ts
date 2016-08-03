import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {TimelinePage} from '../timeline/timeline';
import {TopicPage} from '../topic/topic';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  mySelectedIndex: number;

  tab1Root: any = TimelinePage;
  tab2Root: any = TopicPage;
  tab3Root: any = ContactPage;

  homeRoot: any = HomePage;
  aboutRoot: any = AboutPage;
  contactRoot: any = ContactPage;


  //
  //
  constructor(navParams: NavParams) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = TimelinePage;
    this.tab2Root = TopicPage;
    this.tab3Root = ContactPage;

    this.homeRoot = HomePage;
    this.aboutRoot = AboutPage;
    this.contactRoot = ContactPage;

    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
