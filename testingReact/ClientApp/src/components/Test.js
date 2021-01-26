import React, { Component } from 'react';


const GeneratorButton = props => (
    <button
        className="btn btn-primary gen-button"
        onClick={props.onClick}
    >
        {props.value}
    </button>
);

class AnotherGeneratorButton extends Component {
    render() {
        return <button className="btn btn-primary gen-button" onClick={this.props.onClick}>{this.props.value}</button>
    } 
}

export class Test extends Component {
  static displayName = Test.name;

  constructor(props) {
      super(props);
      this.rangeArray = Array.from({ length: this.startingValue }, (v, i) => i);
      this.state = {
          currentCount: 0,
          buttons: [Array.from({ length: 5 }, (v, i) => i), Array.from({ length: 5 }, (v, i) => i)]
      };
      this.incrementCounter = this.incrementCounter.bind(this);
      this.appendNewRange = this.appendNewRange.bind(this);
      this.startingValue = 10;
  }

  incrementCounter() {
    this.setState({
        currentCount: this.state.currentCount + 1,
    });
    }

    getRange(max) {
        return Array.from({ length: max }, (v, i) => i);
    }

    appendNewRange() {
        this.setState({
            buttons: this.state.buttons.map(o => o + 1),
        });
        debugger;
    }

  render() {
    return (
        <div>
            <h1>State: {this.state.currentCount}</h1>
            <button className="btn btn-primary">State variable has a value of {this.startingValue} </button>
            <div className="btn-div">
                {this.rangeArray.map(i =>
                    <GeneratorButton value={i} onClick={this.incrementCounter} />
                )}
            </div>
            <p>Other buttons</p>
            <div className="btn-div">
                {this.state.buttons.map(
                    buttonsRange => <div className="btn-div">{buttonsRange.map(i => <GeneratorButton value={i} onClick={this.appendNewRange} />)}</div>
                )}
            </div>
      </div>
    );
  }
}
