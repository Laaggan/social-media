import React, { Component, useState, useEffect } from 'react';

export class ShowAllUsers extends Component {
    static displayName = ShowAllUsers.name;

  constructor(props) {
    super(props);
      this.state = { profiles: [], loading: true };
  }

  render() {
    return (
      <>
        <div>
        <h1 id="tabelLabel" >Show user information</h1>
        <p>This component demonstrates fetching data from the server.</p>
            </div>
            {/*<InputId />*/}
            <UserDisplay
                getProfileById={getProfileById}
                getAllProfiles={getAllProfiles}
            />
       </>
    );
    }

}

async function getAllProfiles() {
    const response = await fetch('api/Home/GetAllProfiles');
    const data = await response.json();
    return data
}

async function getProfileById(id) {
    const response = await fetch('api/Home/GetByID?Id=' + id);
    const data = await response.json();
    return data
}

const UserDisplay = (props) => {
    const [profiles, setProfiles] = useState([{ id: null, userName: '', age: null }]);

    useEffect(() => {
        async function fetchData() {
            const data = await props.getAllProfiles();
            setProfiles([...data]);
        }
        fetchData();
    }, [])
    
    return (
        <>
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>User name</th>
                    <th>Age</th>
                    <th>Id</th>
                </tr>
            </thead>
                <tbody>
                {profiles.map(profile_ =>
                    <tr key={profile_.id}>
                        <td>{profile_.userName}</td>
                        <td>{profile_.age}</td>
                        <td>{profile_.id}</td>
                    </tr>
                )}
            </tbody>
                </table>
        </>
)}