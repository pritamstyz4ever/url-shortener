
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Shortener from './Shortener';

class MainApp extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Shortener} />
          <Route path="/link/:_id" component={Shortener} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, { })(MainApp);