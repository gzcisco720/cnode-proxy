import React from 'react';
import { observer, inject } from 'mobx-react';
import Proptypes from 'prop-types';
import { AppState } from '../../store/app-state';
import Helmet from 'react-helmet';
import Button from 'material-ui/Button';

@inject('appState')
@observer
export default class TopicList extends React.Component {
  componentDidMount() {
    // do something
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
    return (
      <div>
        <Helmet>
          <title>Topic List</title>
        </Helmet>
        <Button color="primary" variant="raised">Button</Button>
        <div key="listTopic">{this.props.appState.msg}</div>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: Proptypes.instanceOf(AppState),
};
