import React from 'react';
// import { observer, inject } from 'mobx-react';
import Proptypes from 'prop-types';
import { AppState } from '../../store/app-state';
import Helmet from 'react-helmet';
import Container from '../layout/container';
import Tabs, { Tab } from 'material-ui/Tabs';
import TopicListItem from './list-item';
// @inject('appState')
// @observer
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
    // do something
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
    const topic = {
      title: 'this is a title',
      username: 'Eric',
      reply_count: '20',
      visit_count: '30',
      create_at: 'today',
      tab: 'share',
    };
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
        <TopicListItem onClick={this.onListItemClick} topic={topic} />
      </Container>
    );
  }
}

TopicList.propTypes = {
  appState: Proptypes.instanceOf(AppState),
};
