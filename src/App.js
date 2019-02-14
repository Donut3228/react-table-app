import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import up from './soft-up.svg';
import down from './soft-down.svg';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: ['ID', 'First Name', 'Last Name', 'E-Mail', 'Phone'],
    }
  }
  render() {
    var header = this.state.keys.map(item => <div className='header-item'>{item} <img src={up} className='up-arrow' alt='up-arrow' /></div>)
    return (
      <>
        {header}
      </>
    );
  }
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      visibility: !this.state.visibility,
    })
  }
  render() {
    const item = this.props.item;
    return (
      <div className='item-wrapper'>
        <div className='item-grid' onClick={this.handleClick}>
          <div className='item'>{item.id}</div>
          <div className='item'>{item.firstName}</div>
          <div className='item'>{item.lastName}</div>
          <div className='item'>{item.email}</div>
          <div className='item'>{item.phone}</div>
        </div>
        <div className={this.state.visibility === false ? 'details-close' : 'details-show'}>
          <p>Selected user: <b>{item.firstName} {item.lastName}</b></p>
          <p>Description: {item.description}</p>
          <p>Address: <b>{item.address.streetAddress}</b></p>
          <p>City: <b>{item.address.city}</b></p>
          <p>State: <b>{item.address.state}</b></p>
          <p>Zip: <b>{item.address.zip}</b></p>
        </div>
      </div>
    );
  }
}

class Rows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const rows = this.props.items.map(item => <Row item={item}/>);
    return (
      <>{rows}</>
    )
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    axios.get('http://localhost:3000/data.json').then(res => {
      const items = res.data.map(item => item);
      this.setState({
        items: items,
      })
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='header-grid'><Header /></div>
        <Rows items={this.state.items} />
      </div>
    );
  }
}


export default App;