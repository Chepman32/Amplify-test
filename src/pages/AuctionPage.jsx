import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { Button, Card, Col, Row, Typography, Space, Spin } from "antd";
import { withAuthenticator } from "@aws-amplify/ui-react";
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

const AuctionPage = () => {
  const [cars, setCars] = useState([]);
  const [loadingBid, setLoadingBid] = useState(false);

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
      setLoadingBid(true);
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
      fetchCars();
    } catch (e) {
      console.error(e);
      // Handle the error, e.g., display an error message to the user
    } finally {
      setLoadingBid(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>Virtual Car Auction</Typography.Title>
      <Row gutter={[16, 16]}>
        {cars.map((car) => (
          <Col key={car.id} span={8}>
            <Card title={`${car.make} ${car.model}`} extra={
              <Button onClick={() => handleBidClick(car)} disabled={loadingBid}>
                {loadingBid ? <Spin /> : 'Place Bid'}
              </Button>
            }>
              <Space direction="vertical">
                <Typography.Text>Year: {car.year}</Typography.Text>
                <Typography.Text>Price: ${car.price}</Typography.Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AuctionPage;
