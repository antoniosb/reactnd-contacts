import React, { Component } from 'react';
import ListContacts from './ListContacts.js';
import * as ContatcsAPI from './utils/ContactsAPI.js'

export default class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContatcsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((c) => c.id !== contact.id)
    }))
  }

  render() {
    return (
      <div>
        <ListContacts onRemoveContact={this.removeContact} contacts={this.state.contacts} />
      </div>
    );
  }
}
