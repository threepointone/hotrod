//@flow

import React from 'react';
import nullthrows from 'nullthrows';
import { render } from '../src';

class App extends React.Component<{}, { ctr: number }> {
  state = {
    ctr: 0,
  };
  componentDidMount() {
    setInterval(
      () => console.log('annnnd') || this.setState({ ctr: this.state.ctr + 1 }),
      1000,
    );
  }
  render() {
    return <div className="abc">hello world {this.state.ctr}</div>;
  }
}

render(<App />, nullthrows(document.getElementById('app')));
