import React, { Component } from 'react';

export class AddNewUser extends Component {
    static displayName = AddNewUser.name;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Add new user to website</h1>

        <NewUserForm />
      </div>
    );
  }
}

const NewUserForm = (props) => {
    return (
        <>
            <form class="form-group">
            <label>
                    Name:
            <input class="form-control" type="text" name="name" />
                </label>
            <label>
                    Age:
            <input class="form-control" type="text" name="name" />
            </label>
            </form>
            <button style={{ display: 'block' }} className="btn btn-primary">Add user</button>
        </>
        )
}