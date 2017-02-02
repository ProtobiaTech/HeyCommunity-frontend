import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { AppService } from '../../common/services/app.service';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/topic.model';


@Component({
  selector: 'page-topic-create',
  templateUrl: 'topic-create.html',
})
export class TopicCreatePage {
  newTopic: {content?: string, title?: string, topic_node_id?: number} = {};

  //
  // constructor
  constructor(
    public appService: AppService,
    public topicService: TopicService,
    public translateService: TranslateService,
    public viewCtrl: ViewController,
    public navCtrl: NavController
  ) {
  }


  //
  // ion view did enter
  ionViewDidLoad() {
  }


  //
  // topic create handler
  topicCreateHandler(ngForm) {
      let data: any = {
        title: ngForm.value.title,
        topic_node_id: ngForm.value.topic_node_id,
        content: ngForm.value.content,
      };

      this.topicService.store(data)
      .then((newTopic: Topic) => {
        this.dismiss();
      });
  }


  //
  // dismiss
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
