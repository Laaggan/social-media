import React, { Component, useState } from 'react';

export class TestHooks extends Component {
    static displayName = TestHooks.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return (
            <>
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
                </div>
            <CounterWithHooks />
            </>
        );
    }
}

function CounterWithHooks() {
    const [count, setCount] = useState(2);

    return (
        <div>
            <h1>Counter with hooks</h1>

            <p>This is the same example of a React component but with hooks.</p>

            <p aria-live="polite">Current count: <strong>{count}</strong></p>

            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}