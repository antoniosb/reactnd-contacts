import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ContactList extends Component {
  render() {
    const people = this.props.contacts
    return (
      <ol>
        { people.map((person, index) => (
          <li key={index}>{person.name}</li>
        )) }
      </ol>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ContactList contacts={[
          {name: 'Joao'},
          {name: 'Maria'},
          {name: 'Jose'}
        ]}/>
        <ContactList contacts={[
          {name: 'John'},
          {name: 'Mary'},
          {name: 'Joseph'}
        ]}/>
      </div>
    );
  }
}

export default App;
