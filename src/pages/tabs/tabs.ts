import { Component } from '@angular/core';

import { TimelinePage } from '../timeline/timeline';
import { TopicPage } from '../topic/topic';
import { ActivityPage } from '../activity/activity';
import { MePage } from '../me/me';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TimelinePage;
  tab2Root: any = TopicPage;
  tab3Root: any = ActivityPage;
  tab4Root: any = MePage;

  constructor() {

  }
}
