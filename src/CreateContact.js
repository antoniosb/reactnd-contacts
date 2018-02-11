import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput.js'
import serializeForm from 'form-serialize'

export default class CreateContact extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, {hash: true})
    console.log(values)
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
