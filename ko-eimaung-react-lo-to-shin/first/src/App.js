import React from 'react'

class Item extends React.Component{
  render(){
    return (<li>
      {this.props.name} : {this.props.price} $
    </li>)
  }
}

class App extends React.Component{

  state ={ items : [
    {name : "book",price : 20},
    {name : "phone",price : 30}
  ]}
  render(){
    return (
      <div>
        <h1>Hello React</h1>
        <ul>
          {this.state.items.map(i=>{
              return (
                <Item name={i.name} price={i.price} />
              )
          })} 
        </ul>
      </div>
    )
  }
}

export default App