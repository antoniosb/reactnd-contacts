import React, { Component } from 'react';
import ListContacts from './ListContacts.js';
import * as ContatcsAPI from './utils/ContactsAPI.js'
import CreateContact from './CreateContact.js'

export default class App extends Component {
  state = {
    contacts: [],
    screen: 'list',
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

  navigateToCreate = () => {
    this.setState({ screen: 'create' })
  }

  render() {
    return (
      <div>
        { this.state.screen === 'list' && (
          <ListContacts
            onRemoveContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate={this.navigateToCreate}
          />
        )}
        { this.state.screen === 'create' && (
          <CreateContact/>
        )}
      </div>
    );
  }
}
