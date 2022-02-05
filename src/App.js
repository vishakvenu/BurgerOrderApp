import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { BrowserRouter,Routes,Route,useNavigate, Link } from 'react-router-dom';
import './App.css';
import Burger from './component/Burger/BurgerComponent/Burger';
import Confirm from './component/Confirm/confirm';
import FormField from './component/Form/Form';
import Nav from './component/nav/nav';
import Order from './component/Orders/Order';

function App() {
  const navigate=useNavigate()
  const alertRef=useRef(null)
  const [orderConfirm, setOrderConfirm] = useState(false);

  useEffect(()=>{
    if(orderConfirm){
      setTimeout(()=>{setOrderConfirm(false)},5000)
    }

  },[orderConfirm])

  const removeHandler=(e)=>{
    setOrderConfirm(false)
    
  }
  return (
    <div className="App">
    <Nav />
    {orderConfirm &&
    <div className="sucessModal" onClick={removeHandler}>
    <Alert variant="success" className='alertModel' ref={alertRef}>
    <Alert.Heading>Order Placed Succesfully</Alert.Heading>
  <p>
    Enjoy your meal  
    <Link to="/orders"> view Orders</Link>
  </p>
  </Alert>
    </div>
   }
    
    <Routes>
    <Route path="/" element={<Burger />} />
    <Route path="/form" element={<FormField />} />
    <Route path="/confirm" element={<Confirm navigate={navigate} setOrderConfirm={setOrderConfirm}/>} />
    <Route path="/orders" element={<Order  />} />
    </Routes>
    
    
    </div>
  );
}

export default App;
