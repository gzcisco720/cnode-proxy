import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import ToolBar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

class NavBar extends React.Component {
  constructor() {
    super();
    this.onHomeIconClick = this.onHomeIconClick.bind(this);
    this.onCreateTopicButtonClick = this.onCreateTopicButtonClick.bind(this);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
  }
  onHomeIconClick() {
    console.log(this);// eslint-disable-line
  }
  onCreateTopicButtonClick() {
    console.log(this);// eslint-disable-line
  }
  onLoginButtonClick() {
    console.log(this);// eslint-disable-line
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Cnode Proxy
            </Typography>
            <Button color="inherit" onClick={this.onCreateTopicButtonClick}>Create Topic</Button>
            <Button color="inherit" onClick={this.onLoginButtonClick}>Login</Button>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
