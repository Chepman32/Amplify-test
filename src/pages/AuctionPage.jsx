import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { Button, Flex, Heading, Text, View, withAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';

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

const AuctionPage = ({ signOut }) => {
  const [cars, setCars] = useState([]);

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
    <View className="App">
      <Heading level={1}>Virtual Car Auction</Heading>
      {cars.map((car) => (
        <Flex key={car.id} direction="column" marginY="2">
          <Text>{car.make} {car.model}</Text>
          <Text>Year: {car.year}</Text>
          <Text>Price: ${car.price}</Text>
          <Button onClick={() => handleBidClick(car)}>Place Bid</Button>
        </Flex>
      ))}
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(AuctionPage);
