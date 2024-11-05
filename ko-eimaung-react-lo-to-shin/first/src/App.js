import React from 'react'

class Item extends React.Component{
  render(){
    return (<li>
      {this.props.name} : {this.props.price} $
    </li>)
  }
}

class App extends React.Component{
  render(){
    return (
      <div>
        <h1>Hello React</h1>
        <ul>
          <Item name="apple" price="399" />
          <Item name="banana" price="202" />
        </ul>
      </div>
    )
  }
}

export default App