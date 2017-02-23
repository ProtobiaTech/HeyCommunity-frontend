import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { TopicService } from './services/topic.service';
import { TopicTranslations } from './i18n/topic-translations';

import { MyTopicPage } from './pages/my-topic';
import { TopicPage } from './pages/topic';
import { TopicCreatePage } from './pages/topic-create';
import { TopicDetailPage } from './pages/topic-detail';
import { TopicCommentPage } from './pages/topic-comment';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MyTopicPage,
    TopicPage,
    TopicCreatePage,
    TopicDetailPage,
    TopicCommentPage,
  ],
  entryComponents: [
    MyTopicPage,
    TopicPage,
    TopicCreatePage,
    TopicDetailPage,
    TopicCommentPage,
  ],
  providers: [
    TopicService,
  ],
  exports: [
  ],
})
export class TopicModule {
  constructor(
    public heyApp: AppService
  ) {
    this.subscribeEvents();

    this.heyApp.loadTranslations(TopicTranslations);
  }


  //
  // Subscribe events
  subscribeEvents() {
  }
}
