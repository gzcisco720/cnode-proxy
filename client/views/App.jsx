import React from 'react';
import Routes from '../config/router';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
  componentDidMount() {
    // do something
  }
  render() {
    return [
      <div key="navbar">
        <Link to="/">list</Link>
        <Link to="/detail">detail</Link>
      </div>,
      <Routes key="router" />,
    ];
  }
}
