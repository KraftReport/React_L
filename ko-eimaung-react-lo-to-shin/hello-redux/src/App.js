import logo from './logo.svg';
import './App.css';
import { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router ,Routes ,Route,Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const users  = [
  {id : 1, name : "kyaw kyaw", gender : 'male'},
  {id : 2, name : 'mya mya', gender : 'female'},
  {id : 3, name : 'bo bo', gender : 'male'},
  {id : 4,name :' po po',gender : 'female'}
]

const User = props => {
  const {name} = useParams()
  return (<b>{name}</b>)
}

const Male = props => {
  return (
    <>
    {users.filter(i => i.gender === 'male').map(i => <li key={i.id} >{i.name}</li>)}
    </>
  )
}

const Female = props => {
  return (
    <>
    {users.filter(i=> i.gender === 'female').map(i => <li key={i.id}>{i.name}</li>)}
    </>
  )
}

const Item = ({name,price}) => {
  return (
    <li>
    <div>{name}</div>
    <div>{price}$</div>
    </li>
  )
}

const App =   props => {
  let nameRef = createRef()
  let priceRef = createRef()
  const add =  () => {
    props.add(
      props.items.length + 1,
      nameRef.current.value,
      priceRef.current.value
    )
  }

  const [apiUsers,setApiUsers] = useState([])

  useEffect(()=> {
    fetch('https://reqres.in/api/users').then(a => a.json()).then(b => setApiUsers(b.data))
  },[])

  const addApiUsers = () => {
    fetch('https://reqres.in/api/users',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body :JSON.stringify( {'first_name':'Tom'})
    }).then(a=>a.json()).then(b=>setApiUsers([...apiUsers,b]))
  }
  return (
    <>
    <div>{apiUsers.map(i=><b key={i.id}>{i.first_name}</b>)}</div>
    <button onClick={addApiUsers}>add api users</button>
    <Router>
    <ul>
  <li><Link to="/user/alice">Alice</Link></li>
  <li><Link to="/user/bob">Bob</Link></li>
 </ul>
 <div>
 <Routes>
    <Route path='/user/:name' element= {<User/>}></Route>
  </Routes>
 </div>
    </Router>
<Router>
 <ul>
  <li><Link to='/male'>Male</Link></li>
  <li><Link to='/female'>Female</Link></li>
 </ul>

 <div>

  <Routes>
    <Route path='/male' element= {<Male/>}> </Route>
    <Route path='/female' element = {<Female/>}></Route>
  </Routes>
 </div> 
</Router>

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