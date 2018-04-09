import React from 'react';
import Helmet from 'react-helmet';
import marked from 'marked';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui';
import Container from '../layout/container';
import { topicDetailStyle } from './styles';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Reply from './reply';
import dateFormat from 'dateformat';

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
  };
}) @observer

class TopicDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.topicStore.getTopicDetail(id);
  }

  render() {
    const { classes } = this.props;
    const { id } = this.props.match.params;
    const topic = this.props.topicStore.detailMap[id];
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="secondary" />
          </section>
        </Container>
      );
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} Replies`}</span>
            <span>{`Latest Comment ${dateFormat(topic.last_reply_at, 'yy-mm-dd')}`}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    );
  }
}
TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
};
TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(topicDetailStyle)(TopicDetail);
