import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Container from '../layout/container';
import Tabs, { Tab } from 'material-ui/Tabs';
import TopicListItem from './list-item';
import List from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import queryString from 'query-string';
import { tabs } from '../../util/variable-define';

@inject((stores) => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  };
})
@observer
export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor() {
    super();
    this.onTabChange = this.onTabChange.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
  }
  componentDidMount() {
    const tab = this.getTab();
    this.props.topicStore.fetchTopics(tab);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search));
    }
  }
  onTabChange(e, value) {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    });
  }
  /* eslint-disable */
  onListItemClick() {
  };
  /* eslint-enable */
  getTab(search) {
    const searchString = search || this.props.location.search;
    const query = queryString.parse(searchString);
    return query.tab || 'all';
  }
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
      topicStore,
    } = this.props;
    const { syncing } = topicStore;
    const topicList = topicStore.topics;
    const tab = this.getTab();
    return (
      <Container>
        <Helmet>
          <title>Topic List</title>
        </Helmet>
        <Tabs value={tab} onChange={this.onTabChange}>
          {
            Object.keys(tabs).map(tabKey => (
              <Tab key={tabKey} label={tabs[tabKey]} value={tabKey} />
            ))
          }
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
  location: PropTypes.object.isRequired,
};
