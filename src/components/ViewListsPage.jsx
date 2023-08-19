import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BiAddToQueue } from "react-icons/bi";
import { BsCardText, BsBoxArrowUpRight } from "react-icons/bs";

const ViewListsPage = () => {
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const apiKey = localStorage.getItem("apiKey");
  const apiToken = localStorage.getItem("apiToken");
  const { listId } = useParams();
  const [hoverCard, setHoverCard] = useState(null);

  //Fetching Cards

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`
        );

        setCards(response.data);
      } catch (error) {
        console.log("Error fetching cards", error);
      }
    };

    fetchCards();
  }, [apiKey, apiToken, listId]);

  //Creating new card

  const handleCreateCard = async () => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,

        {
          name: cardName,
          desc: cardDescription,
          idList: listId,
        }
      );

      setCards((prevCards) => [...prevCards, response.data]);
      setCardName("");
      setCardDescription("");
    } catch (error) {
      console.log("Error in card creation", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white p-20">
        <h2 className="text-3xl font-bold  text-teal-900 mb-10">
          Your Card List
        </h2>

        <div className="flex flex-wrap gap-20">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-blue-700 to-cyan-400 p-4 mt-5 rounded-lg shadow-md font-bold mb-4 w-48 h-48 text-center hover:from-cyan-700 hover:to-cyan-500 "
              onMouseEnter={() => setHoverCard(card.id)}
              onMouseLeave={() => setHoverCard(null)}
            >
              <Link
                to={`/card-details/${listId}/${card.id}`}
                className="rounded-md text-center p-4 transition-opacity"
              >
                {hoverCard === card.id ? (
                  <BsBoxArrowUpRight className="text-4xl font-bold  mt-8 ml-12" />
                ) : (
                  <div>
                    <span>
                      <h2 className="text-black font-bold text-2xl mt-2 mb-2">
                        {card.name}
                      </h2>
                    </span>
                    <BsCardText className="text-3xl ml-7 mt-5 font-extrabold text-yellow-300" />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <h3 className="text-2xl text-teal-900 mt-8 font-bold mb-5">
            Add New Card{" "}
          </h3>
          <BiAddToQueue className="text-2xl mt-3 text-teal-900 font-bold" />
        </div>
        <div className="flex gap-4 mb-4 items-center">
          <input
            className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 border-black"
            placeholder="Card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

          <input
            className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 border-black"
            type="text"
            placeholder="Card description"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />

          <button
            className="px-6 py-3 rounded bg-gradient-to-r from-blue-700 to-teal-600 font-bold hover:duration-100 hover:from-blue-500 hover:to-blue-500"
            onClick={handleCreateCard}
          >
            {" "}
            Add{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewListsPage;
