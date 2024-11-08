import logo from './logo.svg';
import './App.css';
import { createRef } from 'react';
import { connect } from 'react-redux';

const Item = ({name,price}) => {
  return (
    <li>
    <div>{name}</div>
    <div>{price}$</div>
    </li>
  )
}

const App = props => {
  let nameRef = createRef()
  let priceRef = createRef()
  const add =  () => {
    props.add(
      props.items.length + 1,
      nameRef.current.value,
      priceRef.current.value
    )
  }

  return (
    <>
    <ul>
      {props.items.map(i => 
        <Item key={i.id} name={i.name} price={i.price}/>
      )}
    </ul>
    <input type='text' ref={nameRef}/>
    <input type='text' ref={priceRef}/>
    <button onClick={add}>Add</button>
    </>
  )
}

const stateToProps = state => {
  return {items  : state}
}

const dispatchToProps = dispatch => {
  return {
    add : (id,name,price) => {
      dispatch({
        type : 'ADD',
        item : {id,name,price}
      })
    }
  }
}


const reduxApp = connect(stateToProps,dispatchToProps)(App)

export default reduxApp