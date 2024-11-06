import React from 'react'

class Item extends React.Component{
  render(){
    return (<li>
      {this.props.name} : {this.props.price} $
    </li>)
  }
}

class AppForm extends React.Component{
  nameRef = React.createRef()
  priceRef = React.createRef()
  
  add = () =>{
    this.props.add(this.nameRef.current.value,this.priceRef.current.value)
  }

  render(){
    return(
      <>
      <input type='text' ref={this.nameRef}/>    
      <input type='text' ref={this.priceRef}/>   
      <button onClick={this.add}>Add Item</button>
      </>
    )
  }
}

class App extends React.Component{

  state ={ items : [
    {id:1,name : "book",price : 20},
    {id:2,name : "phone",price : 30}
  ]}



  nameRef = React.createRef()
  priceRef = React.createRef()

  add = (name,price) =>{
    let id = this.state.items.length + 1 
      this.setState({items:
        [...this.state.items,{id:id,name : name,price :price}]
      })
  }

  render(){
    return (
      <div>
        <h1>Hello React</h1>
        <ul>
          {this.state.items.map(i=>{
              return (
                <Item key={i.id} name={i.name} price={i.price} />
              )
          })} 
        </ul>
        <AppForm add={this.add}/>
      </div>
    )
  }
}

export default App