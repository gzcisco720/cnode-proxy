import { observable, action, extendObservable } from 'mobx';
import { get } from '../util/http';
import { topicSchema } from '../util/variable-define';

const createTopic = (topic) => {
  return Object.assign({}, topicSchema, topic);
};

class Topic {
  constructor(data) {
    extendObservable(this, data);
  }
  @observable syncing = false;
}

export default class TopicStore {
  @observable topics;
  @observable syncing;
  constructor({ topics, syncing } = { topics: [], syncing: false }) {
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
    this.syncing = syncing;
  }
  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }
  @action fetchTopics(tab) {
    this.syncing = true;
    this.topics = [];
    return new Promise((resolve, reject) => {
      get('/topics', {
        mdrender: false,
        tab,
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic);
          });
        } else {
          reject();
        }
        this.syncing = false;
      }).catch((err) => {
        reject(err);
        this.syncing = false;
      });
    });
  }
}
