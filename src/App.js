import React, { Component } from 'react';
import ListContacts from './ListContacts.js';
import * as ContatcsAPI from './utils/ContactsAPI.js'
import CreateContact from './CreateContact.js'
import { Route } from 'react-router-dom'

export default class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContatcsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    ContatcsAPI.remove(contact).then(() => {
      this.setState((prevState) => ({
        contacts: prevState.contacts.filter((c) => c.id !== contact.id)
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
        <Route path='/create' component={CreateContact} />
      </div>
    );
  }
}
