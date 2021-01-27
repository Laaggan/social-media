import React, { Component, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

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
            <TweetDisplay
                getProfileById={getProfileById}
                getAllTweets={getAllTweets}
            />
       </>
    );
    }

}

async function getAllTweets() {
    const response = await fetch('api/Home/getAllTweets');
    const data = await response.json();
    return data
}

async function getProfileById(id) {
    const response = await fetch('api/Home/GetByID?Id=' + id);
    const data = await response.json();
    return data
}

const TweetDisplay = (props) => {
    const [userName, setUserName] = useState("Limpan");
    const [tweet, setTweet] = useState("Hello world");

    useEffect(async () => {
        const data = await props.getAllTweets();
        setProfiles([...data]);
        debugger;
    }, [])
    
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
)}