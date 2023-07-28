import React,{useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


const CardDetails = () => {

  const apiKey = localStorage.getItem('apiKey');
    const apiToken = localStorage.getItem('apiToken');
    const {cardId}=useParams();
    const [cardData, setCardData] = useState(null);


    const fetchCardDetails= useCallback(async()=>{

      try{

    const response = await axios.get(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`)

    setCardData(response.data)

      }catch(error){
        console.log(error)
      }
    },[apiKey, apiToken, cardId])
    

    useEffect(()=>{
      if(cardId){
        fetchCardDetails()
      }
    },[cardId, fetchCardDetails])

  

  return (
    
        <div>
      <h3>Name: {cardData?.name}</h3>
      <p>Description: {cardData?.desc}</p>
      </div>

  )
}

export default CardDetails