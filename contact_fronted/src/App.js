 import { useEffect, useState } from 'react';
import './App.css';
import {getContacts} from './api/contactApi.js'
import Header from './components/Header.jsx';

function App() {

  const[data,setData] = useState({})
  const[currentPage,setCurrentPage] = useState(0)

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(()=>{
    getAllContacts()
  },[])

  const toogleModal = (show)=> {console.log('cliked')}

  return (
    <>
    <Header toogleModal={toogleModal} noOfContacts={50} />
    </>
  );
}

export default App;
