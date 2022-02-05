import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { addBurgerItems, addCheckOutDetails,removeBurgerItems, reset } from '../../../features/BurgerSlice';
import './Adder.css';
import {useNavigate} from 'react-router-dom'

const Adder = () => {
    const [disable, setDisable] = useState(
        {
            lettuce: true,
            tomato: true,
            onion: true,
            cheese: true,
            beef: true

        });

    const [fruitCount, setFruitCount] = useState({
        lettuce: 0,
        tomato: 0,
        onion: 0,
        cheese: 0,
        beef: 0
    });
    useEffect(() => {
        let checkOutDetails={
            ...fruitCount, 
            totalPrice
         }
        dispatch(addCheckOutDetails(checkOutDetails))
        dispatch(reset())
        localStorage.setItem("orderDeatils",JSON.stringify(""))
    }, []);
    const [totalPrice, setTotalPrice] = useState(45);
    const [count, setCount] = useState(1);
     const dispatch = useDispatch();
     const checkoutState = useSelector(state => state.burger.addCheckOutDetails);
    const navigate=useNavigate()
     
    // adding price amount of each burger item and also their count

    const addHandler = (fruits, val) => {
        
        setDisable((prev) => ({ ...prev, [fruits]: false }))
        setTotalPrice(prev => prev + val)
        setFruitCount(prev => ({ ...prev, [fruits]: prev[fruits] + 1 }))
        setCount(prev=>prev+1)
        dispatch(addBurgerItems({fruits,count}))
    }

    // removing the amount of burger item and their count, if the count val<0 or total price<45 we disabled the remove button
    
    const removeHandler = (fruits, val) => {
        dispatch(removeBurgerItems({fruits}))
        setFruitCount(prev => ({ ...prev, [fruits]: prev[fruits] - 1 }))
        setTotalPrice(prev => prev - val)
        if (totalPrice <= 45 + val||fruitCount[fruits]<=1) {
            setDisable((prev) => ({ ...prev, [fruits]: true }))
        }

    }

// collecting the order details including the number of ingredients
    const checkoutHandler=()=>{
        let checkOutDetails={
           ...fruitCount,
           totalPrice
        }

        // console.log(checkOutDetails)
        dispatch(addCheckOutDetails(checkOutDetails))
      
        navigate('/form') 
    }

    return <>
        <div className='btnContainer'>
            <h2 className='text-center'>Total Price: {totalPrice}</h2>

            <div className='rows p-1'>
                <h3> Lettuce </h3>
                <span style={{ padding: "0 10px" }}>Rs-7</span>
                <div>{fruitCount.lettuce} nos</div>
                <button className='btns' onClick={() => addHandler(Object.keys(disable)[0], 7)}>Add</button>
                <button className={disable.lettuce ? "disabled" : "btns"} onClick={() => removeHandler(Object.keys(disable)[0], 7)}>Remove</button>

            </div>
            <div className='rows p-1' >
                <h3> Tomato </h3>
                <span style={{ padding: "0 10px" }}>Rs-8</span>
                <div>{fruitCount.tomato} nos</div>
                <button className='btns' onClick={() => addHandler(Object.keys(disable)[1], 8)}>Add</button>
                <button className={disable.tomato ? "disabled" : "btns"} onClick={() => removeHandler(Object.keys(disable)[1], 8)}>Remove</button>

            </div>
            <div className='rows' >
                <h3> Onion </h3>
                <span style={{ padding: "0 10px" }}>Rs-5</span>
                <div>{fruitCount.onion} nos</div>
                <button className='btns' onClick={() => addHandler(Object.keys(disable)[2], 5)}>Add</button>
                <button className={disable.onion ? "disabled" : "btns"} onClick={() => removeHandler(Object.keys(disable)[2], 5)}>Remove</button>

            </div>
            <div className='rows' >
                <h3> Cheese</h3>
                <span style={{ padding: "0 10px" }}>Rs-10</span>
                <div>{fruitCount.cheese} nos</div>
                <button className='btns' onClick={() => addHandler(Object.keys(disable)[3], 10)}>Add</button>
                <button className={disable.cheese ? "disabled" : "btns"} onClick={() => removeHandler(Object.keys(disable)[3], 10)}>Remove</button>

            </div>
            <div className='rows' >
                <h3> Beef</h3>
                <span style={{ padding: "0 10px" }}>Rs-20</span>
                <div>{fruitCount.beef} nos</div>
                <button className='btns' onClick={() => addHandler(Object.keys(disable)[4], 20)}>Add</button>
                <button className={disable.beef ? "disabled" : "btns"} onClick={() => removeHandler(Object.keys(disable)[4], 20)}>Remove</button>

            </div>
            <div className=' text-center'>
            <button className='checkBtn' onClick={checkoutHandler}>Checkout</button>
            </div>
            
        </div>

    </>;
};

export default Adder;
