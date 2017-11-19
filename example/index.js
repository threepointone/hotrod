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
    return (
      <div className="abc" onclick={() => alert(123)} style="color:blue;">
        hello world {this.state.ctr}
        <span> and {this.state.ctr}</span>
        <One ctr={this.state.ctr} />
      </div>
    );
  }
}

function One({ ctr }) {
  return <div>maybe {ctr}</div>;
}

render(<App />, nullthrows(document.getElementById('app')));
