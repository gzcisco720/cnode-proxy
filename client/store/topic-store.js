import { observable, action, extendObservable, computed } from 'mobx';
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
  @observable details;
  constructor({ topics = [], syncing = false, details = [] } = {}) {
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
    this.syncing = syncing;
    this.details = details.map(topic => new Topic(createTopic(topic)));
  }
  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }
  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail;
      return result;
    }, {});
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
  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap);
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data));
            this.details.push(topic);
            resolve(topic);
          } else {
            reject();
          }
        }).catch(reject);
      }
    });
  }
}
