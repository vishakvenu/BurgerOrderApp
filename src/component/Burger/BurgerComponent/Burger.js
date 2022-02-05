import React from "react";
import { useSelector } from "react-redux";
import Adder from "../Adder/Adder";
import "./Burger.css";


const Burger = () => {
  const lettuceState = useSelector(state => state.burger.lettuce);
  const tomatoState = useSelector(state => state.burger.tomato);
  const onionState = useSelector(state => state.burger.onion);
  const cheeseState = useSelector(state => state.burger.cheese);
  const beefState = useSelector(state => state.burger.beef);

  
  return(
      <div>
  <div id="burger">
 
    <div id="top-bun"></div>
    <div id="lettuce" ></div>
    {lettuceState?.map((item,indx)=>(
      <div id="lettuce" key={indx}></div>
    ))}
    <div id="tomato" ></div>
    {tomatoState?.map((item,indx)=>(
      <div id="tomato" key={indx}></div>
    ))}
    <div id="onion" ></div>
    {onionState?.map((item,indx)=>(
      <div id="onion" key={indx}></div>
    ))}
    <div id="cheese" ></div>
    {cheeseState?.map((item,indx)=>(
      <div id="cheese" key={indx}></div>
    ))}
    <div id="beef" ></div>
    {beefState?.map((item,indx)=>(
      <div id="beef" key={indx}></div>
    ))}
    
    {/* <div id="onion"></div>
    <div id="cheese"></div>
    <div id="beef"></div> */}
    <div id="bottom-bun"></div>
  </div>
    <Adder />
  </div>
  )
};

export default Burger;
