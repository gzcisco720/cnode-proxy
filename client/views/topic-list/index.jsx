import React from 'react';
import { observer, inject } from 'mobx-react';
import Proptypes from 'prop-types';
import { AppState } from '../../store/app-state';
@inject('appState')
@observer
export default class TopicList extends React.Component {
  componentDidMount() {
    // do something
  }
  render() {
    return <div key="listTopic">{this.props.appState.msg}</div>;
  }
}

TopicList.propTypes = {
  appState: Proptypes.instanceOf(AppState),
};
