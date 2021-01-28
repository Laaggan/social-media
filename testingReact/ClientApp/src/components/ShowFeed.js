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
    const [filterName, setFilterName] = useState('Show all');

    const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    function handleFilterNameChange(o) {
        setFilterName(o.value);
    }

    // TODO: The distinct operation should be done on Ids and not on usernames since many users can have the same username
    function getUserNames(tweetsData) {
        const userNames = tweetsData.map(tweet => tweet.userName)
        return userNames.filter(distinct)
    }

    var userNamesOptions = getUserNames(tweets).map(
        function (u) {
            var option = { value: u, label: u }
            return option
        }
    )
    // This is probably not the correct way to do it.
    userNamesOptions.unshift({ value: "Show all", label: "Show all" });

    // This fetches all the tweets everytime the application renders, bad...
    // Nope, if you don't put the second empty argument above happens. This runs only once.
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
                    placeholder="Show all"
                    options={userNamesOptions}
                    onChange={handleFilterNameChange}
                />
            </div>

            <div>
                {tweets.filter(t => t.userName == filterName || filterName === "Show all")
                    .map(tweet =>
                        <TweetDisplay
                            key={tweet.tweetId}
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