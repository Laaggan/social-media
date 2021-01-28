import { data } from 'jquery';
import React, { Component, useState, useEffect } from 'react';
import Select from 'react-select'

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
                GetAllUserNames={GetAllUserNames}
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

async function GetAllUserNames() {
    const response = await fetch('api/Home/getAllUserNames').then(
        async (response) => {
            const data = await response.json();
            return data
        });
    return response
}

const TweetForm = (props) => {
    const [tweet, setTweet] = useState('');
    const [userId, setUserId] = useState(null);
    const [userNameOptions, setUserNameOptions] = useState([]);

    const cleanForm = () => {
        setTweet('');
    }

    useEffect(() => {
        async function fetchData() {
            const data = await props.GetAllUserNames()
            const result = data.map(
            function (u) {
                var option = { value: u, label: u }
                return option
                });
            setUserNameOptions([...result]);
        }
        fetchData();
    }, [])

    return (
        <>
            <Select
                value="Show all"
                options={userNameOptions}
            />

            <form className="form-group">
            <label>
                    Tweet:
            <textarea
                className="form-control"
                type="text"
                name="name"
                value={tweet}
                onChange={e => setTweet(e.target.value)}
                maxLength="255"
            />
            </label>
            </form>

            <button style={{ display: 'block' }} className="btn btn-primary" onClick={() => props.AddTweetToDb(1, tweet).then(cleanForm())}>Send message</button>
            <p> {tweet} </p>
        </>
        )
}