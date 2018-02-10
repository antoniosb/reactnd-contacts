import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'

export default class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveContact: PropTypes.func.isRequired,
    onNavigate: PropTypes.func
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

  clearQuery = () => { this.setState({ query: '' }) }

  render() {
    const { contacts, onRemoveContact } = this.props
    const { query } = this.state
    let showingContacts

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }
    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
      <div className='list-contacts-top'>
        <input
          className='search-contacts'
          type='text'
          placeholder='Search at will!'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <Link
          to="/create"
          className='add-contact'>
          Add Contact!
        </Link>
      </div>
        { showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Clear.</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onRemoveContact(contact)}
                className="contact-remove"
              >Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
