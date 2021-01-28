import React, { Component, useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast'

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
    const [showModal, setShowModal] = useState(false);

    const cleanForm = () => {
        setUserName('');
        setAge('');
    }

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmitUser = function () {
        props.AddUserToDb({ UserName: userName, Age: age }).then(cleanForm()).finally(toast.success("User was added"));
        handleClose();
    }

    return (
        <>
            <Toaster />
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
            <button style={{ display: 'block' }} className="btn btn-primary" onClick={handleShow}>Add user</button>

            <Modal show={showModal} onHide={handleClose} >
            <Alert variant="light">
                <Alert.Heading>Wait a minute?!</Alert.Heading>
                <p>
                        Are you sure you want ot add a user to this website?
                </p>
                    <button style={{ display: 'inline' }} className="btn btn-success" onClick={handleSubmitUser}>I am sure!</button>
                    <button style={{ display: 'inline' }} className="btn btn-secondary" onClick={handleClose}>I changed my mind...</button>
            </Alert>
            </Modal>
        </>
        )
}