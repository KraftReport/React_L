import React,{useState,createRef} from 'react'
import ToolBar from './ToolBar'
import Item from './Item'
 

let MyBox = React.createContext('my ball')

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

const Ball = props =>{
  return(
    <div>{React.useContext(MyBox)}</div>
  )
}

const App = props => {

  let [item,setItem] = useState([
    {id:1,name :"item 1",price : 100},
    {id:2,name:"item 2",price: 200}
  ]) 

  let nameRef = createRef()
  let priceRef = createRef()

 const add = () =>{
    let id =  item.length + 1
    let name =  nameRef.current.value
    let price = priceRef.current.value
      setItem( 
        [...item,{ id, name, price}]
       )
  }

  MyBox = React.createContext('red ball')
 
    return (
      <div>
      
        <Ball />
        <h1>Hello React</h1>
        <ul>
          {
            item.map(i=>(
              <Item key={i.id} name={i.name} price={i.price}/>
          ))
          }
        </ul>
          <input type='text' ref={nameRef} />
          <input type='text' ref={priceRef} />
          <button onClick={add}>Add</button>  
      </div>
    )
  }

 

 

export default App