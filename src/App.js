import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './App.css';

import filterObj from './filterFunctions'
import up from './soft-up.svg';
import down from './soft-down.svg';
// import logo from './logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: ['id', 'firstName', 'lastName', 'email', 'phone'],
    };
  }

  componentDidUpdate() {
  
  }

  render() {
    var header = this.state.keys.map(item =>
      <div className='header-item'>
        {item} <img onClick={() => this.props.sortHandler(item)}
        src={item !== this.props.sortColumn ? down : this.props.sortDirection ? up : down}
         className='up-arrow' alt='up-arrow' />
      </div>)
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
    const rows = this.props.items.map(item => <Row item={item} />);
    return (
      <>{rows}</>
    )
  }
}

class Pagination extends Component {

}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      sortСol: '',
      sortDirection: true, // true === 'ASC' && false === 'DESC'
      filterValue: '',
      filteredItems: []
    }
    axios.get('https://donut-react-table-app.herokuapp.com/data.json').then(res => {
      const items = res.data.map(item => item);
      this.setState({
        items: items,
        filteredItems: items
      })
    });
    this.sortHandler = this.sortHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
  }

  componentDidUpdate() {
    // console.log(this.state.filterValue);
    console.log(this.state.filteredItems);
  }
  

  filterChangeHandler(event) {
    this.setState({
      filterValue: event.target.value
    })
  }

  submitHandler() {
    this.setState({
      filteredItems: filterObj(this.state.items, this.state.filterValue),
      filterValue: ''
    })
  }

  sortHandler(sortColumn) {
    if (sortColumn !== this.state.sortCol) {
      // sorting new column
      this.setState({
        sortCol: sortColumn,
        sortDirection: true,
        filteredItems: typeof this.state.filteredItems[0][sortColumn] === 'number' 
        ? this.state.filteredItems.sort((a, b) => a[sortColumn] - b[sortColumn]) 
        : this.state.filteredItems.sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]))
      })
    } else {
      // sorting same column in reverse order
      this.setState({
        sortDirection: !this.state.sortDirection,
        filteredItems: typeof this.state.filteredItems[0][sortColumn] === 'number'
          ? !this.state.sortDirection ? this.state.filteredItems.sort((a, b) => a[sortColumn] - b[sortColumn]) 
          : this.state.filteredItems.sort((a, b) => b[sortColumn] - a[sortColumn]) 
          : !this.state.sortDirection ? this.state.filteredItems.sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]))
          : this.state.filteredItems.sort((a, b) => b[sortColumn].localeCompare(a[sortColumn]))
      })
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='filter-input'>
          <input placeholder='type something to search' value={this.state.filterValue} onChange={this.filterChangeHandler}></input>
          <button onClick={this.submitHandler}>Search</button>
        </div>
        <div className='header-grid'><Header sortHandler={this.sortHandler} 
        sortColumn={this.state.sortCol} sortDirection={this.state.sortDirection}/></div>
        <Rows items={this.state.filteredItems} />
        {/* <Pagination /> */}
      </div>
    );
  }
}


// export default connect()(App); 
export default App;