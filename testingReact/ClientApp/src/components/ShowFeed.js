import React, { Component, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Select from 'react-select'

export class ShowFeed extends Component {
    static displayName = ShowFeed.name;

  constructor(props) {
    super(props);
      this.state = { profiles: [], loading: true };
  }

  render() {
    return (
      <>
        <div>
        <h1 id="tabelLabel" >Tweet feed</h1>
        <p>Enjoy!</p>
            </div>
            {/*<InputId />*/}
            {/*<TweetDisplay
                getProfileById={getProfileById}
                getAllTweets={getAllTweets}
            /> */}
            <TweetView
                getAllTweets={getAllTweets}
            />
       </>
    );
    }

}

async function getAllTweets() {
    const response = await fetch('api/Home/getAllTweetData');
    const data = await response.json();
    return data
}

async function getProfileById(id) {
    const response = await fetch('api/Home/GetByID?Id=' + id);
    const data = await response.json();
    return data
}

const TweetView = (props) => {
    const [tweets, setTweets] = useState([]);

    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    function getUserNames(tweetsData) {
        const userNames = tweetsData.map(tweet => tweet.userName)
        return userNames.filter(distinct)
    }

    var userNames = getUserNames(tweets);
    var userNamesOptions = userNames.map(
        function (u) {
            var option = { value: u, label: u }
            return option
        }
    );
    debugger;
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanillazzz' }
    ]

    useEffect(async () => {
        const data = await props.getAllTweets();
        setTweets([...data]);
    }, [])

    return (
        <>
            <div>
                <Select options={userNamesOptions} />
            </div>
            <div>
            {tweets.map(tweet =>
                <TweetDisplay
                    userName={tweet.userName}
                    tweet={tweet.tweet}
                />
                )}
            </div>
        </>
    )
}

const TweetDisplay = (props) => {
    const [userName, setUserName] = useState(props.userName);
    const [tweet, setTweet] = useState(props.tweet);

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>{userName}</Card.Title>
                <Card.Text>
                {tweet}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}