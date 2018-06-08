
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import ShortenerForm from './Shortener/ShortenerForm';

class MainApp extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ShortenerForm} />
          <Route path="/:_id" component={ShortenerForm} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(MainApp);