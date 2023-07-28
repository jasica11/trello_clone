import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import {TbListDetails} from 'react-icons/tb'


const ViewListsPage = () => 

{
  const [cards,setCards] = useState([]);
const [cardName, setCardName] = useState('');
const [cardDescription, setCardDescription] = useState('')

const apiKey = localStorage.getItem('apiKey');
const apiToken = localStorage.getItem('apiToken');
const {listId} = useParams();




    //Fetching Cards

    useEffect(()=>{

        const fetchCards = async ()=>{
            try{
                const response = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`);

                setCards(response.data);
            }
        
        catch(error){
            console.log('Error fetching cards',error)
        }
    }

    fetchCards();

}, [apiKey, apiToken, listId]);

//Creating new card

const handleCreateCard = async()=>{

    try{

        const response = await axios.post(
            `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,

            {
                name: cardName,
                desc: cardDescription,
                idList: listId,
            }
        )

        setCards((prevCards)=>[...prevCards, response.data]);
        setCardName('');
        setCardDescription('')
    }
    catch(error){
        console.log('Error in card creation', error)
    }
}



  return (
  

<div className="min-h-screen bg-gradient-to-b from-teal-950 to bg-cyan-700 p-20"> 


    <h2 className="text-3xl font-bold  text-cyan-500 mb-10">Your Card List</h2>

    <div className="flex flex-wrap gap-20">
    
    {cards.map ((card) => (
            <div key={card.id} className="bg-gradient-to-r from-green-700 to-yellow-300 p-4 mt-5 rounded-lg shadow-md font-bold mb-4 w-48 h-48 text-center hover:from-cyan-700 hover:to-cyan-500">
                <div className="flex items-center justify-between spca-x-2">
        
              <Link to={`/card-details/${listId}/${card.id}`} className="text-yellow-300 rounded-md  hover:text-black">

             < TbListDetails classname="text-4xl"/>

                <span>
             <h2 className="text-black font-bold text-2xl mt-2 mb-2">
                {card.name}</h2>
                </span>

 </Link>
             </div>
            
            
              
   </div>
  )) }
  </div>

  <h3> Want to make a new card for your selected list? </h3>
    <input placeholder="card name" value={cardName} onChange={(e)=> setCardName(e.target.value)} />

    <input type="text" placeholder="card description" value={cardDescription} onChange={(e)=> setCardDescription(e.target.value)} />

    <button onClick={handleCreateCard}> Create Card</button>
    
    
  </div>
    )}

export default ViewListsPage