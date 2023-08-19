import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrello, FaExclamationCircle } from "react-icons/fa";
// import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthorizationPage = () => {
  // const [apiKey, setApiKey] = useState("");
  // const [apiToken, setApiToken] = useState("");
  // const [orgId, setOrgId] = useState("");
  const { isAuthorized, setIsAuthorized } = useAuth();

  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  // const { authorize } = useAuth();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/"); // Redirect to dashboard if already authorized
    }
  }, [isAuthorized, navigate]);

  const [formValues, setFormValues] = useState({
    apiKey: "",
    apiToken: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAuthorization = async () => {
    try {
      const { apiKey, apiToken } = formValues;
      const orgResponse = await axios.get(
        `https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${apiToken}`
      );

      const orgId = orgResponse.data.length > 0 ? orgResponse.data[0].id : "";
      // sessionStorage.setItem("orgId", orgId); // Store orgId in session storage

      if (orgId) {
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("apiToken", apiToken);
        sessionStorage.setItem("orgId", orgId);
        setIsAuthorized(true);
        navigate("/");
      } else {
        console.error("Error creating organization: No organization ID found.");
      }
    } catch (error) {
      console.error("Authorization failed:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  };

  // useEffect(() => {
  //   const storedApiKey = localStorage.getItem("apiKey");
  //   const storedApiToken = localStorage.getItem("apiToken");

  //   const storedOrgId = sessionStorage.getItem("orgId"); // Get stored orgId

  //   setOrgId(storedOrgId);
  //   setApiKey(storedApiKey);
  //   setApiToken(storedApiToken);

  //   if (storedApiKey && storedApiToken) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  from-blue-400 via-purple-500 to-pink-500">
      <div className="p-8 bg-white rounded-lg">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 italic mr-3">
            {" "}
            Welcome to Trello Clone{" "}
          </h1>
          <FaTrello className=" text-blue-600 text-3xl mr-1 hover:animate-bounce-trello" />
        </div>
        <h3 className="text-lg text-center-mb-4">
          Please Enter your API Key an API Token to Connect!
        </h3>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-center ">
            Authorization
          </h2>
          <label className="block text-gray-700 font-medium mb-1">
            API Key:
          </label>
          <input
            className="w-full p-2 border rounded focus:outline-none border-gray-400 focus:border-blue-300 focus:ring "
            type="text"
            name="apiKey"
            value={formValues.apiKey}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            API Token:
          </label>
          <input
            className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-300 focus:ring "
            type="text"
            name="apiToken"
            value={formValues.apiToken}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium focus:outline-none "
          onClick={handleAuthorization}
        >
          Authorize
        </button>
      </div>

      {showError && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg flex items-center border border-red-600 mt-10">
          <FaExclamationCircle className="text-red-700 text-sm mr-2" />
          <p className="text-black text-sm font-bold">
            Wrong API Key or API Token!
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthorizationPage;
