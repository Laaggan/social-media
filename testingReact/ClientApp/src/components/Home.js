import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
            <p>This is a twitterish clone built for me to learn react</p>

            <img src={process.env.PUBLIC_URL + "/profile_pictures/4.png"} />
      </div>
    );
  }
}
