import React, { Component, useState } from 'react';
import Alert from 'react-bootstrap/Alert'

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

            // TODO: make this into modal to ask if user is really sure they want to add new user
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    Aww yeah, you successfully read this important alert message. This example
                    text is going to run a bit longer so that you can see how spacing within an
                    alert works with this kind of content.
                </p>
                <hr />
                <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to keep things nice
                    and tidy.
                </p>
            </Alert>
        </>
        )
}