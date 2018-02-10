import React, { Component } from 'react';
import ListContacts from './ListContacts.js';
import * as ContatcsAPI from './utils/ContactsAPI.js'
import CreateContact from './CreateContact.js'

export default class App extends Component {
  state = {
    contacts: [],
    screen: 'create',
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
        { this.state.screen === 'list' && (
          <ListContacts onRemoveContact={this.removeContact} contacts={this.state.contacts} />
        )}
        { this.state.screen === 'create' && (
          <CreateContact/>
        )}
      </div>
    );
  }
}
