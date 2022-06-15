import React from "react";
import ReactDOM from "react-dom";


export default function GroceryList({grocerylist,DeleteItem}){
  return(
    <>
    {grocerylist.map((e)=>{
       return(
       <li key={e.id} className="ListItems">
        <div>
        <h2>{e.name}</h2>
        <button onClick={()=>{DeleteItem(e.id)}}>DELETE</button></div>
       </li>)
      })
            
    }
 
        </>
    )
}
