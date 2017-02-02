import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { AppService } from '../../common/services/app.service';
import { TopicService } from '../services/topic.service';
import { Topic } from '../models/topic.model';

import { TopicCommentPage } from './topic-comment';


@Component({
  selector: 'page-topic-detail',
  templateUrl: 'topic-detail.html',
})
export class TopicDetailPage {
  topicIndex: number;
  topic: Topic;


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public topicService: TopicService,
    public translateService: TranslateService,
    public platform: Platform,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {
    this.topicIndex = this.navParams.data.topicIndex;
    this.topic = this.topicService.topics[this.topicIndex];
  }


  //
  // ion view did enter
  ionViewDidLoad() {
  }


  //
  //
  presentTopicCommentModal(topicComment?){
    if (this.heyApp.authService.authOrLogin()) {
      let params = {
        topic: this.topic,
        topicIndex: this.topicIndex,
        topicComment: topicComment,
      }

      let modal = this.modalCtrl.create(TopicCommentPage, params);

      modal.onDidDismiss(() => {
        this.topic = this.topicService.topics[this.topicIndex];
      });

      modal.present();
    }
  }


  //
  //
  setThumbUp() {
    if (this.heyApp.authService.authOrLogin()) {
      this.topicService.setThumbUp(this.topic.id).then((topic) => {
        this.topic = topic;
        this.topicService.topics[this.topicIndex] = topic;
      });
    }
  }


  //
  //
  setThumbDown() {
    if (this.heyApp.authService.authOrLogin()) {
      this.topicService.setThumbDown(this.topic.id).then((topic) => {
        this.topic = topic;
        this.topicService.topics[this.topicIndex] = topic;
      });
    }
  }


  //
  //
  setStar() {
    if (this.heyApp.authService.authOrLogin()) {
      this.topicService.setStar(this.topic.id).then((topic) => {
        this.topic = topic;
        this.topicService.topics[this.topicIndex] = topic;
      });
    }
  }


  //
  //
  goBack() {
    this.navCtrl.pop();
  }


  //
  // destroy
  destroy() {
    this.heyApp.utilityComp.presentLoading();

    this.topicService.destroy(this.topic)
    .then((ret) => {
      this.heyApp.utilityComp.dismissLoading();

      let index = this.topicService.topics.indexOf(this.topic);
      this.topicService.topics.splice(index, 1);

      this.navCtrl.pop();
    }, (ret) => {
      this.heyApp.utilityComp.dismissLoading();
      let content = JSON.parse(ret._body);
      this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('Alter'), subTitle: content});
    });
  }


  //
  // present action sheet
  presentActionSheet() {
    let title = this.heyApp.translateService.instant('Operations');

    let btnDestructive = {
      text: this.heyApp.translateService.instant('Destructive'),
      role: 'destructive',
      handler: () => {
        let self = this;
        self.destroy();
      }
    }

    let buttons = [{
      text: this.heyApp.translateService.instant('Report'),
      handler: () => {
        this.heyApp.utilityComp.presentAlter({title: this.heyApp.translateService.instant('Report'), subTitle: this.heyApp.translateService.instant('Thanks For Your Report')});
      }
    }, {
      text: this.heyApp.translateService.instant('Cancel'),
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];

    if (this.heyApp.authService.isAuth && (this.heyApp.authService.userInfo.id === this.topic.user_id || this.heyApp.authService.userInfo.is_admin)) {
      buttons.unshift(btnDestructive);
    }

    this.heyApp.utilityComp.presentActionSheet(title, buttons);
  }
}
