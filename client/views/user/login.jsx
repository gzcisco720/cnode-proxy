import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import UserWrapper from './user';
import loginStyles from './styles/login-style';

@inject((stores) => {
  return {
    appState: stores.appState,
    user: stores.appState.user,
  };
})@observer
class UserLogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      accesstoken: '19317ff3-2d24-4784-84d4-3c968085ff04',
      helpText: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillMount() {
    if (this.props.user.isLogin) {
      this.context.router.history.replace('/user/info');
    }
  }

  handleInput(event) {
    this.setState({
      accesstoken: event.target.value.trim(),
    });
  }

  handleLogin() {
    if (!this.state.accesstoken) {
      return this.setState({
        helpText: 'Required',
      });
    }
    this.setState({
      helpText: '',
    });
    return this.props.appState.login(this.state.accesstoken)
      .then(() => {
        this.context.router.history.replace('/user/info');
      })
      .catch((error) => {
        console.log(error); //eslint-disable-line
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            label="Please Enter Cnode AccessToken"
            placeholder="Please Enter Cnode AccessToken"
            required
            helperText={this.state.helpText}
            value={this.state.accesstoken}
            onChange={this.handleInput}
            className={classes.input}
          />
          <Button
            variant="raised"
            color="secondary"
            onClick={this.handleLogin}
            className={classes.loginButton}
          >
            Login
          </Button>
        </div>
      </UserWrapper>
    );
  }
}
UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
UserLogin.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(loginStyles)(UserLogin);
