import React, { Component } from 'react';
import ListContacts from './ListContacts.js';
import * as ContactsAPI from './utils/ContactsAPI.js'
import CreateContact from './CreateContact.js'
import { Route } from 'react-router-dom'

export default class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    ContactsAPI.remove(contact).then(() => {
      this.setState((prevState) => ({
        contacts: prevState.contacts.filter((c) => c.id !== contact.id)
      }))
    })
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onRemoveContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    );
  }
}
