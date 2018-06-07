import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1 className="App-title">Welcome to Simple Url Shortner</h1>
            <h2 className="App-intro">Powered By React and Node JS and Bootstrap CSS</h2>
          </header>
        </div>
        <div className="container">
          <div class="jumbotron">
            <h2>Paste URL to shorten:</h2>
            <form enctype='application/json' action="/url" method="post">
              <div class="form-group">
                <input tabIndex="1" className="form-control -" type="text" placeholder="Url" value="https://jobs.cisco.com/jobs/SearchJobs/?3_19_3=163&3_12_3=187" />
              </div>
              <button type="submit" class="btn btn-default">Shorten</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
