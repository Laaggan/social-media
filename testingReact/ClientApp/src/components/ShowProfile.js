import { data } from 'jquery';
import React, { Component, useState, useEffect } from 'react';
import Select from 'react-select'


function ShowProfile({ match }) {
    const [user, setUser] = useState({ userBio: "", userId: "", userName: "" });
    useEffect(() => {
        async function fetchData() {
            var response = await fetch("api/Home/getUserById?Id=" + match.params.userId);
            var data = await response.json();
            setUser({ ...data });
        }
        fetchData();
    }, [])

    return (
        <>
            <img src={process.env.PUBLIC_URL + "/profile_pictures/" + user.userId + ".png"}/>
            <h2>{user.userName}</h2>
            <p>{user.userBio}</p>
        </>
    );
}

export default ShowProfile;