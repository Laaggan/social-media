import React, { Component, useState } from 'react';

export class CreateTweet extends Component {
    static displayName = CreateTweet.name;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Write your message below</h1>
            <TweetForm
                AddTweetToDb={AddTweetToDb}
            />
      </div>
    );
  }
}

async function AddTweetToDb(userId, tweet) {
    const response = await fetch(
        'api/Home/createTweet?userId=' + userId + "&tweet=" + tweet, {
            method: 'post'
        }
    );
}

const TweetForm = (props) => {
    const [tweet, setTweet] = useState('');

    const cleanForm = () => {
        setTweet('');
    }

    return (
        <>
            <form className="form-group">
            <label>
                    Tweet:
            <textarea
                className="form-control"
                type="text"
                name="name"
                value={tweet}
                onChange={e => setTweet(e.target.value)}
                maxlength="255"
            />
            </label>
            </form>

            <button style={{ display: 'block' }} className="btn btn-primary" onClick={() => props.AddTweetToDb(1, tweet).then(cleanForm())}>Send message</button>
            <p> {tweet} </p>
        </>
        )
}