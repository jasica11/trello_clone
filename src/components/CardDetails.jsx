import React,{useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { ScaleLoader } from 'react-spinners'


//Load Spinner


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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
      setTimeout(() => {
        setLoading(false); 
      }, 1000); 
    }, []);

  return (
    <>

{loading && ( 

<div className="bg-gray-600 flex items-center justify-center min-h-screen">
<ScaleLoader
  color="#36d7b7"
  height={35}
  loading={loading}
  margin={3}
  radius={2}
  speedMultiplier={1}
  width={4}
/>
</div>
)}
<div className="min-h-screen p-20 bg-gradient-to-r from-teal-900 to-cyan-400">
        <div className="w-1/2 mx-auto p-6  hover:from-gray-300 hover:to-white rounded-lg shadow-lg mt-25 bg-gradient-to-r from-yellow-300 to-yellow-300 hover:text-cyan-800 ">
          <h2 className="text-3xl font-bold mb-4 text-purple-800"> Card Details</h2>
          <div className="mb-4 flex items-center">
      <h3 className="text-xl font-bold text-black-400">Name :</h3>
      <p className="text-teal-900 font-bold ml-2 text-xl">{cardData?.name}</p>
          </div>

          <div className="mb-4 flex items-center">
            <h4 className="text-lg font-bold text-black-400">Description : </h4>
      <p className="text-cyan-800 font-bold ml-2">{cardData?.desc}</p>
      
          </div>
      </div>

  </div>
  </>
  )
}

export default CardDetails