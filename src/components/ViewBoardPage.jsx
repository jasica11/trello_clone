import React,{useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

import {TbListDetails} from 'react-icons/tb'


const ViewBoardPage = () => {

const [lists, setLists] = useState([]);
const [newList, setNewList] = useState('');
const apiKey = localStorage.getItem('apiKey');
const apiToken = localStorage.getItem('apiToken');
const {boardId} = useParams();




useEffect(()=>{

  //fetching lists for user's selected board

  const fetchLists = async()=>{

    try{

      const response = await axios.get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
      )

      setLists(response.data)
    }
    catch(error){
      console.log('Error fetching lists', error)
    }
  };

  fetchLists()
},[apiKey, apiToken, boardId])


//Creating New Lists
const handleCreateList = async()=>{

  try{

      await axios.post(
          `https://api.trello.com/1/lists?key=${apiKey}&token=${apiToken}`,
          {
              name: newList,
              idBoard: boardId,
          }
      )

    //  fetchLists();
      setNewList('')

  } catch(error){
      console.log('Error new list creation', error)
  }

  
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to bg-cyan-800 p-20">
      <h1 className="text-3xl font-bold  text-cyan-500 mb-8">Lists For Your Selected Board</h1>

  
      
      {lists.map((list)=>(

<div key={list.id} className="bg-gradient-to-r from-yellow-300 to-orange-300 mt-4 p-4 rounded-lg shadow-md flex justify-between items-center text-black font-bold text-center hover:from-green-500 hover:to-cyan-400"
>

  < Link to ={`/view-list/${boardId}/${list.id}`}>{list.name}</Link>

< Link to ={`/view-list/${boardId}/${list.id}`}> <TbListDetails className="text-2xl hover:text-yellow-500" /></Link>
  



  </div>  
      ))}


<div className="mt-10">
<div className='flex items-center space-x-4'>
<h4 className="mb-10 text-yellow-400 text-xl font-bold mt-10 "> Want to create a new list? <span className="animate-pulse text-2xl"> 👉</span></h4>
<input
className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-4 focus:ring-yellow-400"
placeholder='Create New List'
value={newList}
onChange={(e)=> setNewList(e.target.value)}
/>
<button className="px-6 py-3 text-black rounded font-semibold bg-gradient-to-r from-blue-600 to bg-orange-400 hover:from-yellow-400 hover:to-yellow-300" onClick={handleCreateList}>Create </button>

</div>
</div>
      </div>
  )
}

export default ViewBoardPage