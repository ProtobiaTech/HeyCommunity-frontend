import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { AppService } from '../../common/services/app.service';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/topic.model';


@Component({
  selector: 'page-topic-comment',
  templateUrl: 'topic-comment.html',
})
export class TopicCommentPage {
  topic: Topic;
  topicIndex: number;
  topicComment;
  newComment: {content?: string, topic_id?: number} = {};

  //
  // constructor
  constructor(
    public appService: AppService,
    public topicService: TopicService,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.topicIndex = this.navParams.data.topicIndex;
    this.topic = this.topicService.topics[this.topicIndex];
    this.topicComment = this.navParams.data.topicComment;
  }


  //
  // ion view did enter
  ionViewDidLoad() {
  }


  //
  // topic create handler
  sendTopicCommentHandler(ngForm) {
      let data: any = {
        topic_id: this.topic.id,
        topic_comment_id: this.topicComment ? this.topicComment.id : null,
        content: ngForm.value.content,
      };

      this.topicService.storeComment(data)
      .then((topic: Topic) => {
        this.topic = topic;
        this.topicService.topics[this.topicIndex] = topic;
        this.dismiss();
      });
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
