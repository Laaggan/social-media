import React, { Component, useState } from 'react';

export class AddNewUser extends Component {
    static displayName = AddNewUser.name;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Add new user to website</h1>

            <NewUserForm
                AddUserToDb={AddUserToDb}
            />
      </div>
    );
  }
}

async function AddUserToDb(user) {
    const response = await fetch(
        'api/Home/addNewUser?userName=' + user.UserName + "&age=" + user.Age, {
            method: 'post'
    }
    );
}

const NewUserForm = (props) => {
    const [userName, setUserName] = useState('Nisse');
    const [age, setAge] = useState(50);

    const cleanForm = () => {
        setUserName('');
        setAge('');
    }

    return (
        <>
            <form className="form-group">
            <label>
                    Name:
            <input className="form-control" type="text" name="name" value={userName} onChange={e => setUserName(e.target.value)} />
                </label>
            <label>
                    Age:
            <input className="form-control" type="text" name="name" value={age} onChange={e => setAge(e.target.value)}/>
            </label>
            </form>
            <button style={{ display: 'block' }} className="btn btn-primary" onClick={() => props.AddUserToDb({ UserName: userName, Age: age }).then(cleanForm())}>Add user</button>
            <p> {userName} </p>
            <p> {age} </p>
        </>
        )
}