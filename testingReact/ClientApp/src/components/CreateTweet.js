import { data } from 'jquery';
import React, { Component, useState, useEffect } from 'react';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast'

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
                GetAllUsers={GetAllUsers}
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

async function GetAllUsers() {
    const response = await fetch('api/Home/GetAllUsers').then(
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

    function handleUserChange(o) {
        setUserId(o.value)
    }

    const handleSendMessage = () => props.AddTweetToDb(userId, tweet)
        .then(cleanForm())
        .finally(toast.success('Tweet is now sent!'));

    useEffect(() => {
        async function fetchData() {
            const data = await props.GetAllUsers()
            const result = data.map(
                function (u) {
                    var option = { value: u.userId, label: u.userName }
                return option
                });
            setUserNameOptions([...result]);
        }
        fetchData();
    }, [])

    return (
        <>
            <Toaster />
            <Select
                options={userNameOptions}
                onChange={handleUserChange}
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

            <button style={{ display: 'block' }} className="btn btn-primary" onClick={handleSendMessage}>Send message</button>
            <p> {tweet} </p>
        </>
        )
}