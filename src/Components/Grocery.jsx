import React from "react";
import GroceryInput from "./GroceryInput";
import GroceryList from "./GroceryList";
import {v4 as uuid} from "uuid";



export default function Grocery(){
    const [groceries,setGroceryList] = React.useState([]);
    const [page,setCurrentPage] = React.useState(1);
    const [end,setEndPage] = React.useState();
    const fetchData = async () => {
        try {
        let res = await fetch(`http://localhost:3000/groceryList?_page=${page}&_limit=4`);
        let data = await res.json();
        setGroceryList(data);
        for(var i of res.headers.entries()){
            if(i[0] === 'x-total-count'){
               setEndPage(Math.ceil(i[1]/4));
            }
        }
   
        } catch (error) {
            console.log(error)
            setGroceryList([])
        }
          } 

    const AddItem = async (itemName)=>{
        const payload = {
            id : uuid(),
            name : itemName,
            status: false
        }

        try {
            
           await fetch(`http://localhost:3000/groceryList`,
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {"Content-Type":"application/json"}
            }
            )
            
            fetchData();
           
        } catch (error) {
            console.log(error)
        }
    }

    const DeleteItem = async (itemId) => {
       try {
        await fetch(`http://localhost:3000/groceryList/${itemId}`,
        {
            method: "DELETE"
        })
        fetchData();
       } catch (error) {
        console.log(error)
       }
    }
    React.useEffect(()=>{fetchData()},[page])
    return(
     <>
     <div>
        <div id="heading">
            <img src="https://cdn-icons-png.flaticon.com/512/1261/1261163.png"/>
            <h1>GROCERY LIST</h1>
            </div>
        
        <GroceryInput AddItem={AddItem}/>
       <div id="groceryListContainer"> <ul>
        <GroceryList grocerylist={groceries} DeleteItem={DeleteItem}/>
        </ul>
        </div>
        <div id="navBtn">
            <button onClick={()=>{setCurrentPage((page-1))}} disabled={page === 1}>PREVIOUS</button>
            <h4>{page}</h4>
            <button onClick={()=>{setCurrentPage((page+1))}} disabled={page === end}>NEXT</button>
        </div>
     </div>
     </>   
    )
    
}