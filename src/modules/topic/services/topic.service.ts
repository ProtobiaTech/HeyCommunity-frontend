import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { Topic } from '../models/topic.model';
import { TopicNode } from '../models/topicNode.model';
import { Helper } from '../../common/services/helper.service';


@Injectable()
export class TopicService {
  topics: Topic[] = [];
  type: string = 'new';
  nodeId: number = 0;
  nodes: TopicNode[];
  CACHE: string = 'cache_topics';

  headers: Headers;
  requestOptions: RequestOptions;


  //
  // constructor
  constructor(
    public http: Http,
    public helper: Helper,
    public storage: Storage
  ) {
    this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    this.requestOptions = new RequestOptions({headers: this.headers});
  }


  //
  // get topic from storage
  getTopicsFromStorage() {
    this.storage.get(this.CACHE).then(value => {
      this.topics = JSON.parse(value);
    });
  }


  //
  // get nodes
  getNodes() {
    let api: string = this.helper.getAPI('topic/nodes');

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      this.nodes = response.json();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // get node by id
  getNodeNameById(id) {
    for (let i in this.nodes) {
      if (this.nodes[i] && this.nodes[i].id == id) {
        return this.nodes[i].name;
      }
    }

    return 'Null';
  }


  //
  // show
  show(id): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/show?id=' + id);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // store
  store(params): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/store');

    return this.http.post(api, params, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // update
  update(params): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/update');
    let data: any = {content: params.content};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // destroy
  destroy(params): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/destroy');
    let data: any = {id: params.id};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // store comment
  storeComment(params): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/store-comment');
    let data: any = {
      topic_id: params.topic_id,
      content: params.content,
      topic_comment_id: params.topic_comment_id
    };

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }


  //
  // set thumb up
  setThumbUp(id): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/set-thumb');
    let data: Object = {id: id, value: 'up'};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => {
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // set thumb down
  setThumbDown(id): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/set-thumb');
    let data: Object = {id: id, value: 'down'};

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => {
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // set thumb up
  setStar(params): Promise<Topic> {
    let api: string = this.helper.getAPI('topic/set-star');
    let data: Object = params;

    return this.http.post(api, data, this.requestOptions)
    .toPromise()
    .then(response => {
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // refresh
  refresh(params): Promise<Topic[]> {
    let apiStr = 'topic?node_id=' + this.nodeId + '&type=' + this.type;
    apiStr = apiStr + '&action=refresh&id=' + params.id;
    let api: string = this.helper.getAPI(apiStr);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let topics = response.json();
      this.topics = topics.concat(this.topics);
      this.storageTopics();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // infinite
  infinite(params): Promise<Topic[]> {
    let apiStr = 'topic?node_id=' + this.nodeId + '&type=' + this.type;
    apiStr = apiStr + '&action=infinite&id=' + params.id;
    let api: string = this.helper.getAPI(apiStr);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      let topics = response.json();
      this.topics = this.topics.concat(topics);
      this.storageTopics();
      return response.json();
    })
    .catch(this.handleError);
  }




  //
  // index
  index(): Promise<Topic[]> {
    let apiStr = 'topic?node_id=' + this.nodeId + '&type=' + this.type;
    let api: string = this.helper.getAPI(apiStr);

    return this.http.get(api, this.requestOptions)
    .toPromise()
    .then(response => {
      this.topics = response.json();

      this.storageTopics();
      return response.json();
    })
    .catch(this.handleError);
  }


  //
  // storage topics
  storageTopics() {
    let topics = JSON.stringify(this.topics);
    this.storage.set(this.CACHE, topics);
  }


  //
  //
  clearCache() {
    this.storage.remove(this.CACHE);
  }


  //
  // handle error
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
