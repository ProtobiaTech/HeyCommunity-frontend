import {Component} from '@angular/core';
import {TimelinePage} from '../timeline/timeline';
import {TopicPage} from '../topic/topic';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  private homeRoot: any;
  private aboutRoot: any;
  private contactRoot: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = TimelinePage;
    this.tab2Root = TopicPage;
    this.tab3Root = ContactPage;

    this.homeRoot = HomePage;
    this.aboutRoot = AboutPage;
    this.contactRoot = ContactPage;
  }
}
