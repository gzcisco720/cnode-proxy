import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Container from '../layout/container';
import Tabs, { Tab } from 'material-ui/Tabs';
import TopicListItem from './list-item';
import List from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  };
})
@observer
export default class TopicList extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 'all',
    };
    this.onTabChange = this.onTabChange.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
  }
  componentDidMount() {
    this.props.topicStore.fetchTopics();
  }
  onTabChange(e, value) {
    this.setState({
      tabIndex: value,
    });
  }
  /* eslint-disable */
  onListItemClick() {
  };
  /* eslint-enable */
  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true);
      });
    });
  }
  render() {
    const {
      tabIndex,
    } = this.state;
    const {
      topicStore,
    } = this.props;
    const { syncing } = topicStore;
    const topicList = topicStore.topics;
    return (
      <Container>
        <Helmet>
          <title>Topic List</title>
        </Helmet>
        <Tabs value={tabIndex} onChange={this.onTabChange}>
          <Tab label="All" value="all" />
          <Tab label="Share" value="share" />
          <Tab label="Job" value="job" />
          <Tab label="Q&A" value="ask" />
          <Tab label="Special" value="good" />
          <Tab label="Testing" value="dev" />
        </Tabs>
        <List>
          {
            topicList.map(topic => <TopicListItem key={topic.id} onClick={this.onListItemClick} topic={topic} />)
          }
        </List>
        {
          syncing ? (
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 0' }}>
              <CircularProgress color="secondary" size={100} />
            </div>
          ) : null
        }
      </Container>
    );
  }
}
TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
};
TopicList.propTypes = {
};
