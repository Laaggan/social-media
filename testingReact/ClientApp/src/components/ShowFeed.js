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
    const [filterName, setFilterName] = useState([]);

    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    function getUserNames(tweetsData) {
        const userNames = tweetsData.map(tweet => tweet.userName)
        return userNames.filter(distinct)
    }

    var userNamesOptions = getUserNames(tweets).map(
        function (u) {
            var option = { value: u, label: u }
            return option
        }
    );

    useEffect(() => {
        async function fetchData() {
            const data = await props.getAllTweets();
            setTweets([...data]);
        }
        fetchData();
    }, [])

    return (
        <>
            <div>
                <Select
                    options={userNamesOptions}
                />
            </div>
            <div>
            {tweets.map(tweet =>
                <TweetDisplay
                    key={tweet.tweetId}
                    userName={tweet.userName}
                    tweet={tweet.tweet}
                />
                )}
            </div>
            <p>{filterName}</p>
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