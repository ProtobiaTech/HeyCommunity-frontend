import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Topic } from '../../models/topic';
import { TOPICS } from '../../mocks/topics';


@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html'
})
export class TopicPage {
  topics: Topic[];


  //
  //
  constructor(public navCtrl: NavController) {
    this.topics = TOPICS;
  }


}
