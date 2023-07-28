import React, { useEffect,useState,useCallback } from 'react';
import {AiOutlinePlusCircle, AiFillDelete} from 'react-icons/ai';
import {MdOutlineOpenInNew} from 'react-icons/md'
import {GrUpdate} from 'react-icons/gr'



import axios from 'axios';

const Dashboardpage = () => {

  const [boards, setBoards] = useState([]);
const [orgId, setOrgId] = useState('');
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  const [updatedBoard, setUpdatedBoard] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

 const apiKey = localStorage.getItem('apiKey');
 const apiToken = localStorage.getItem('apiToken');

 const [selectedBoard, setSelectedBoard] = useState(null)
//  const orgId = sessionStorage.getItem('org_id')

  
  //Listing all boards of an organization

  const fetchBoardsList =  useCallback(async (organizationId) => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/organizations/${organizationId}/boards?key=${apiKey}&token=${apiToken}`
      );
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  },[apiKey,apiToken]);

  useEffect(()=>{ 

 const storeOrgId = sessionStorage.getItem('org_id');

 
  console.log('apiKey',apiKey);
  console.log('apiToken',apiToken)

//  setOrgId(orgId);

  if(storeOrgId){
    setOrgId(storeOrgId)
  console.log('Stored Organization ID:', orgId);

    fetchBoardsList(storeOrgId)
  }
},[apiKey,apiToken, fetchBoardsList, orgId])




// fetchBoards();
// }, [apiKey, apiToken, orgId]);

  
    //Creating Board

    const handleCreateBoard = async () => {
      try {


     await axios.post(
          `https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}`,
          {
            name: boardName,
            desc: boardDescription,
            idOrganization: orgId,
        
          }
        );
  
         fetchBoardsList(setOrgId);
     
      setBoardName('');
      setBoardDescription('');
      
      } catch (error) {
        console.log('Board creation failed:', error);
      }
    };
  

    //Updating Board


    const handleUpdateBoard = async (boardId)=>{


      try {
    

       await axios.put(
      `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`,
      
      {
        name: updatedBoard,
        
       
      }

     )

     setBoards((prevBoards) =>
     prevBoards.map((board) =>
       board.id === boardId
         ? { ...board, name: updatedBoard }
         : board))

         setIsUpdating(false);
    //  setUpdatedBoard('');
  
    } catch (error) {
      console.log('Board update failed:', error);
    }
  
    }



    //Delete Board

    const handleDeleteBoard = async(boardId)=>{

try{ 
        await axios.delete(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`
       )

       setBoards((prevBoards) => prevBoards.filter((board)=> board.id !== boardId))
      } 
      catch(error){

        console.log('Failed to delete the board')
      }
    }

//For viewing board

const handleViewBoard=(boardId)=>{

  window.location.href=(`view-board/${boardId}`)
}


   
  return (
   
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to bg-cyan-800 p-20">
    
      <h1 className="text-3xl font-bold  text-cyan-500">All Boards</h1>

<h3 className="mb-10 text-green-400 text-xl font-bold mt-10">Create new board for your organization:</h3>
      <div className="flex gap-4 mb-4 items-center">
      <button className="bg-blue-500 text-white px-4 py-4 rounded-md flex items-center gap-2 hover:bg-blue-600 active:bg-blue-700 transition-colors font-semibold" onClick={handleCreateBoard}>

  Create Board 
   <AiOutlinePlusCircle className="text-2xl font-extrabold text-white" />
  </button>
        <input
         className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
         
         type="text"
         placeholder='Board Name'
         value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
         
         <input  className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
         type="text"
         value={boardDescription}
         placeholder='Description'
          onChange={(e) => setBoardDescription(e.target.value)}
        />

        
      </div>
      <h4 className="font-bold text-green-400 mt-10 mb-10 text-xl">Your boards list:</h4>
      <ul >
        {boards.map((board)=>( 
          <li key={board.id} className="bg-gradient-to-r from-purple-600 via-blue-400 to-pink-600 p-8 rounded-md shadow-md mb-4">
            <div className= "flex items-center justify-between mb-4">

       <h2 className="text-2xl font-bold text-gray-800"> {board.name} </h2>

       

       <div className="flex items-center space-x-2">
             <button className="bg-green-400 hover:bg-green-600 active:bg-green-600  text-black px-3 py-2 rounded-md" onClick={()=>handleViewBoard(board.id)}><MdOutlineOpenInNew className="text-xl" /></button>
             <button className="bg-red-600 hover:bg-orange-600 active:bg-orange-400 text-white px-3 py-2 rounded-md" onClick={()=>handleDeleteBoard(board.id)}> < AiFillDelete className="text-xl"/> </button>

             </div>

</div>   
<p className="text-gray-800 font-bold"> {board.desc}</p>

   {isUpdating && selectedBoard=== board.id && (  
          <div className="mt-2 ml-20">
          <input 
          className="flex space-x-2 items-center rounded-md p-2"
              type="text"
              value={updatedBoard} onChange={(e)=> setUpdatedBoard(e.target.value)}
              onKeyDown={(e)=>{ 

                if(e.key === 'Enter'){
                
                handleUpdateBoard( board.id) }}}
                /> 
                </div>)
             }
             {!isUpdating[board.id] &&(

              <button className="flex space-x-2 items-center bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-600 text-black px-6 py-2 p-8 rounded-md mt-auto mx-auto  font-bold"
               onClick={()=>{
                setSelectedBoard(board.id)
                setUpdatedBoard(board.name);
                setIsUpdating({...isUpdating, [board.id]:true})
              }} > 



       <span  className="mr-2">Update </span>  
       <GrUpdate />
        
               </button>
                
             )}


            
          </li>
        ))}
      </ul>


      </div>
    
      
  )
}

export default Dashboardpage
  