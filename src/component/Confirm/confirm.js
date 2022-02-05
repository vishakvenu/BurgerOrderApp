import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Burger from '../../assets/burger.jpg'
import "./confirm.css"

const Confirm = ({setOrderConfirm}) => {
    const [data, setdata] = useState({});
    const [arr, setArr] = useState([]);
    const [btnValue, setBtnValue] = useState(false);
    const navigate=useNavigate()
    useEffect(() => {
        let datas = JSON.parse(localStorage.getItem("orderDeatils"))
        const localStorageTrans=JSON.parse(localStorage.getItem("order"));
        let transaction=localStorage.getItem("order")
        !==null?localStorageTrans:[
            {lettuce:0,tomato:0,onion:0,cheese:0,beef:0,totalPrice:45,FirstName:"vishak",LastName:"T V",email:"vishakvenu91@gmail.com",street:"Thaivelikakth",pincode:"682301",address:"Thaivelikakth 2n floor","select":"cod"}
        ]

        console.log(transaction)
        setArr(transaction)
        localStorage.setItem("order",JSON.stringify(arr))
        
        setdata(datas)
        if(!datas.hasOwnProperty("lettuce")){
            navigate("/")
        }
    
    }, []);
    
    useEffect(()=>{
    localStorage.setItem("order",JSON.stringify(arr))
    },[arr])

    const submitHandler = () => {
            setBtnValue(true)
            
                let vere = [...arr,data,]
                setArr(vere)
                
            
            
            
            
            setTimeout(()=>{
                
                setBtnValue(false)
                setOrderConfirm(true)
                navigate("/")
                
            },3000)



    }

    const name=data.FirstName?data.FirstName.toUpperCase()+data.LastName.toUpperCase():"" 
    const amountClac=(item,price)=>{
     
        let amount=(item===0?1:item)*price
        // return amount
        if(isNaN(amount)){
            amount=""
        }
        return amount
    }
    
    amountClac(data.lettuce,7)
    // console.log(amount) 
    return <div className='orderBox' >
    <Container fluid="md">
    <Card style={{ width: '100%'}}>
  <Card.Img variant="top" src={Burger} />
  <Card.Body>
    <Card.Title className="text-center"><h2>Order Details</h2></Card.Title>
    <hr className="mt-2 mb-3 "/>
    <div className="container-md">
    <div className='name' >
    <span className="text-muted">Name : </span>
    <h5 >{name}</h5>

    </div>
    <div className='name' >
    <span className="text-muted">Address : </span>
    <h5 >{data.address}</h5>

    </div>
    <div className='name' >
    <span className="text-muted">Email : </span>
    <h5 >{data.email}</h5>

    </div>
    <div className='name' >
    <span className="text-muted">Street : </span>
    <h5 >{data.street}</h5>

    </div>
    <div className='name' >
    <span className="text-muted">Pincode : </span>
    <h5 >{data.pincode}</h5>

    </div>
    
    
    </div>
    <hr className="my-3 "/>
    <h6 className='text-center'>Burger Ingredients</h6>
    <div className='details-box p-2'>
     <div className="d-flex justify-content-between">
    <p className=" mb-0">Lettuce : x{data.lettuce===0?"1":data.lettuce}</p>
    <p className="text-muted mb-0">{amountClac(data.lettuce,7)}</p>
    </div> 
    <div className="d-flex justify-content-between">
    <p className=" mb-0">Tomato : x{data.tomato===0?"1":data.tomato}</p>
    <p className="text-muted mb-0">{amountClac(data.tomato,5)}</p>
    </div>
    <div className="d-flex justify-content-between">
    <p className=" mb-0">Onion : x{data.onion===0?"1":data.onion}</p>
    <p className="text-muted mb-0">{amountClac(data.onion,2)}</p>
    </div>
    <div className="d-flex justify-content-between">
    <p className=" mb-0">Cheese : x{data.cheese===0?"1":data.cheese}</p>
    <p className="text-muted mb-0">{amountClac(data.cheese,10)}</p>
    </div>
    <div className="d-flex justify-content-between">
    <p className=" mb-0">Meat: x{data.beef===0?"1":data.beef}</p>
    <p className="text-muted mb-0">{amountClac(data.beef,20)}</p>
    </div> 
    <hr className="my-2 "/>
    <div className="d-flex justify-content-between">
    <p className=" mb-0">Tax : </p>
    <p className="text-muted mb-0">3</p>
    </div>
    <div className="d-flex justify-content-between">
    <p className=" mb-0">GST : </p>
    <p className="text-muted mb-0">2</p>
    </div>
    <div className="d-flex justify-content-between">
    <p className=" mb-0">Delivery : </p>
    <p className="text-muted mb-0">10</p>
    </div>
    <hr className="my-3 "/>
    <div className="d-flex justify-content-between">
    <h4 className=" mb-0">Total Amount:-</h4>
    <p className="text-muted mb-0">{data.totalPrice}$</p>
    </div>
    </div>
   
    <div className='text-center my-4 d-flex justify-content-around '>
    <Button variant="success" onClick={submitHandler}>{btnValue?"Loading....":"Place Order Now"}</Button>
    <Button variant="warning" onClick={()=>navigate("/")}>Cancel</Button>
    </div>
   
  </Card.Body>
    </Card>
    </Container>
       
    </div>;
};

export default Confirm;

