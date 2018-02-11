import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput.js'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'

export default class CreateContact extends Component {
  static propTypes = {
    onCreateContact: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, {hash: true})
    this.props.onCreateContact(values)
  }

  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type="text" name='name' placeholder='Name'/>
            <input type="email" name='email' placeholder='Email'/>
            <button type='submit'>Add contact</button>
          </div>
        </form>
      </div>
    );
  }
}
