import React from "react";


export default function GroceryInput({AddItem}){

 const [itemName, setItem] = React.useState("");

    return (
        <>
        <div>
            <input  value={itemName} type="text" placeholder="Enter grocery item to add"  onChange={(e)=>{setItem(e.target.value)}}/>
            <button onClick={()=> {AddItem(itemName);setItem("")}}>SAVE</button>
        </div>
        </>
    )
}