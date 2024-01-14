import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, Flex, Heading, Text, View, withAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from './graphql/mutations';
import AuctionPage from "./pages/AuctionPage";

const client = generateClient();

const listCars = `
  query ListCars {
    listCars {
      items {
        id
        make
        model
        year
        price
        auctionEndTime
      }
    }
  }
`;

const App = ({ signOut }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const carData = await client.graphql({ query: listCars });
    const carList = carData.data.listCars;
    setCars(carList.items);
  };

  const handleBidClick = async (car) => {
    try {
      const increasedPrice = Math.ceil(car.price * 1.1); // Increase the price by 10%
      console.log('Increased Price:', increasedPrice);
      await client.graphql({
        query: mutations.updateCar,
        variables: {
          input: {
            id: car.id,
            price: increasedPrice,
          },
        },
      });
      fetchCars()
    } catch (e) {
      console.error(e);
      // Handle the error, e.g., display an error message to the user
    }
  };
  
  

  return (
    <AuctionPage/>
  );
};

export default withAuthenticator(App);
