import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { TimelineService } from './services/timeline.service';
import { TimelineTranslations } from './i18n/timeline-translations';

import { MyTimelinePage } from './pages/my-timeline';
import { TimelinePage } from './pages/timeline';
import { TimelineCreatePage } from './pages/timeline-create';
import { TimelineDetailPage } from './pages/timeline-detail';
import { TimelineCommentPage } from './pages/timeline-comment';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MyTimelinePage,
    TimelinePage,
    TimelineCreatePage,
    TimelineDetailPage,
    TimelineCommentPage,
  ],
  entryComponents: [
    MyTimelinePage,
    TimelinePage,
    TimelineCreatePage,
    TimelineDetailPage,
    TimelineCommentPage,
  ],
  providers: [
    TimelineService,
  ],
  exports: [
  ],
})
export class TimelineModule {
  constructor(
    public heyApp: AppService
  ) {
    this.heyApp.loadTranslations(TimelineTranslations);

    this.subscribeEvents();
  }


  //
  // Subscribe events
  subscribeEvents() {
  }
}
