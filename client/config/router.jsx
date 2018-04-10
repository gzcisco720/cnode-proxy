import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';
// import TestApi from '../views/test-api/index';


export default () => [
  <Route path="/" key="default" exact render={() => <Redirect to="/list" />} />,
  <Route path="/list" key="list" component={TopicList} />,
  <Route path="/detail/:id" key="detail" component={TopicDetail} />,
  <Route path="/user/login" component={UserLogin} exact key="user" />,
  <Route path="/user/info" component={UserInfo} exact key="userInfo" />,
  // <Route key="testApi" component={TestApi} />,
];
