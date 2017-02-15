import { Component } from '@angular/core';
import { NavController, MenuController, Events } from 'ionic-angular';

import { AppService } from '../../common/services/app.service';
import { TopicService } from '../services/topic.service';

import { TopicCreatePage } from './topic-create';
import { TopicDetailPage } from './topic-detail';


@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {
  type: string = 'new';


  //
  // constructor
  constructor(
    public heyApp: AppService,
    public topicService: TopicService,
    public events: Events,
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.topicService.getTopicsFromStorage();
    this.heyApp.menuService.menuTitle = 'topic.Topic Nodes';
    this.heyApp.menuService.currentPageId = 0;
    this.heyApp.menuService.menuPages = [
      {
        pages: [
          {icon: 'bookmarks', id: 0, title: 'topic.All', click: (id) => {let self = this; self.updateTopicByNode(id);}},
          // {icon: 'eye', id: 'null', title: 'Follow', click: () => {let self = this; self.updateTopicByType();}},
          // {icon: 'ribbon', id: 'null', title: 'Excellence', click: () => {let self = this; self.updateTopicByType();}},
        ]
      }
    ];
  }


  //
  // ion view did enter
  ionViewDidLoad() {
    this.topicService.index();
    this.setMenu();
  }


  //
  //
  setMenu() {
    this.topicService.getNodes().then(response => {
      for (var node of response) {
        let pages = {
          title: node.name,
          pages: [
            // {icon: 'bookmark', id: node.id, title: node.name, click: (id) => {let self = this; self.updateTopicByNode(id);}}
          ]
        }

        for (var childNode of node.child_nodes) {
          let page = {icon: 'bookmark', id: childNode.id, title: childNode.name, click: (id) => {let self = this; self.updateTopicByNode(id);}}
          pages.pages = pages.pages.concat(page);
        }

        this.heyApp.menuService.menuPages = this.heyApp.menuService.menuPages.concat(pages);
      }
    });
  }


  //
  //
  updateTopicByType() {
    this.topicService.type = this.type;
    this.topicService.index();
  }


  //
  //
  updateTopicByNode(id) {
    this.heyApp.menuService.currentPageId = id;
    this.topicService.nodeId = id;
    this.topicService.index();
  }


  //
  // goto create topic page
  presentTopicCreateModal() {
    if (this.heyApp.authService.authOrLogin()) {
      let page = TopicCreatePage;
      let params = {}
      let callback = function() {
      }

      this.heyApp.utilityComp.presentModal(page, params, callback);
    }
  }


  //
  // goto topic detail
  gotoTopicDetailPage(topic, index) {
    this.navCtrl.push(TopicDetailPage, {topic: topic, topicIndex: index});
  }


  //
  // Refresh
  doRefresh(refresher) {
    let topic = this.topicService.topics[0];
    let params: any = {
      id: topic ? topic.id : 0,
    }

    this.topicService.refresh(params)
    .then(topics => {
      refresher.complete();
    }, ret => {
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let length = this.topicService.topics.length;
    let params: any = {
      id: length ? this.topicService.topics[length - 1].id : 0,
    }

    this.topicService.infinite(params)
    .then(topics => {
      infiniteScroll.complete();
    }, ret => {
      infiniteScroll.complete();
    });
  }

}
