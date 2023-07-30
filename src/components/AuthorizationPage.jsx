import React, { useState } from 'react';
import axios from 'axios';
import {FaTrello,FaExclamationCircle} from "react-icons/fa";
import {IoMdCheckmarkCircle} from 'react-icons/io'


const AuthorizationPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiToken, setApiToken] = useState('');

  const [showPopup, setShowPopup] = useState(false);

  const [showError, setShowError] = useState(false)
  

  const handleAuthorization = async () => {
    try {  

      // to get the member ID

    
    //   const response = await axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${apiToken}`);
    //   const memberId = response.data.id;
     


    // console.log(memberId)


      //  list of organizations using the member ID
      const orgResponse = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${apiToken}`);

      // If there is only one organization, automatically select and store the organization ID
       const orgId = orgResponse.data.length > 0 ? orgResponse.data[0].id : '';


      // console.log(orgId)
 
      //Storing api key and token

      localStorage.setItem('apiKey', apiKey);
      localStorage.setItem('apiToken', apiToken);

      // Storing the organization ID 
     sessionStorage.setItem('org_id', orgId);

      //Redirecting User to their workspace
     window.location.href= '/dashboard'

     setShowPopup(true);

     setTimeout(()=>{
      setShowPopup(false)
     }, 4000);

    } catch (error) {
      console.error('Authorization failed:', error);

      //show error popup
      setShowError(true);
      setTimeout(()=>{
        setShowError(false)
      }, 4000)
    }
  };

  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  from-blue-400 via-purple-500 to-pink-500">
    < div className="p-8 bg-white rounded-lg">
<div className="flex items-center justify-center mb-6">
<h1 className="text-3xl font-bold text-center text-blue-600 italic mr-3"> Welcome to Trello Clone </h1>
<FaTrello className=" text-blue-600 text-3xl mr-1 hover:animate-bounce-trello" />
</div>
<h3 className="text-lg text-center-mb-4">Please Enter your API Key an API Token to Connect!</h3>

   
      <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2 text-center ">Authorization</h2>
        <label className="block text-gray-700 font-medium mb-1">API Key:</label>
        < input className="w-full p-2 border rounded focus:outline-none border-gray-400 focus:border-blue-300 focus:ring " type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">API Token:</label>
        <input className= "w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-300 focus:ring " type="text" value={apiToken} onChange={(e) => setApiToken(e.target.value)} />
      </div>
      <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium focus:outline-none " onClick={handleAuthorization}>Authorize</button>
      
    </div>

    {showPopup &&(
      <div className="fixed inset-0 flex items-center justify-center min-h-screen z-50">
       
        <div className="bg-white p-15 rounded-lg shadow-lg flex items-center w-1/3 h-1/3"> 
        <IoMdCheckmarkCircle className="text-green-600 text-4xl mr-2" />
        <p className="text-green-600 text-2xl">Authorization Successful!</p>
        </div>
        </div>    
    )}

    {showError &&(
<div className= "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg flex items-center border border-red-600 mt-10"> 
< FaExclamationCircle className="text-red-700 text-sm mr-2"/>
<p className="text-black text-sm font-bold">Wrong API Key or API Token!</p>

</div>
    )}
    </div>
  )
  
};

export default AuthorizationPage;
