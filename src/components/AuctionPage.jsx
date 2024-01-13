import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const listCars = /* GraphQL */ `
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
        const carData = await client.query({ query: listCars });
        console.log("carData", carData)
      const carList = carData.data.listCars.items;
      setCars(carList);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleBidClick = (car) => {
    console.log(`Bid placed for ${car.make} ${car.model}`);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSubmitBid = () => {
    console.log('Bid submitted');
    setVisible(false);
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
      <View style={{ display: visible ? 'block' : 'none' }}>
        <View className="modal">
          <Heading level={2}>Place Bid</Heading>
          <Button onClick={handleSubmitBid}>Submit Bid</Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </View>
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
