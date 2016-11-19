import { Component } from '@angular/core';

import { NoticeService } from '../../services/notice.service';

import { TimelinePage } from '../timeline/timeline';
import { TopicPage } from '../../modules/topic/pages/topic';
import { MePage } from '../me/me';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TimelinePage;
  tab2Root: any = TopicPage;
  tab4Root: any = MePage;


  //
  // construct
  constructor(
    public noticeService: NoticeService
  ) {
  }
}
