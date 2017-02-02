import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Topic } from '../../topic/models/topic.model';

import { AppService } from '../../common/services/app.service';
import { TopicService } from '../services/topic.service';

import { TopicDetailPage } from './topic-detail';


@Component({
  selector: 'page-my-topic',
  templateUrl: 'my-topic.html',
})
export class MyTopicPage {
  type: string = 'new';
  topics: Topic[];


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public topicService: TopicService,
    public navCtrl: NavController
  ) {
    this.topics = [];

    this.topicService.topics.forEach(function(topic) {
      if (topic.user_id === this.heyApp.authService.userInfo.id) {
        this.topics = this.topics.concat(topic);
      }
    }, this)
  }


  //
  // goto topic detail
  gotoTopicDetailPage(topic, index) {
    this.navCtrl.push(TopicDetailPage, {topic: topic, topicIndex: index});
  }
}
