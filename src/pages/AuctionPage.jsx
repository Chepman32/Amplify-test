// AuctionPage.js

import React, { useState, useEffect, useCallback } from "react";
import { Hub } from 'aws-amplify/utils';
import "@aws-amplify/ui-react/styles.css";
import { Modal, Form, Input, Button, Card, Col, Row, Typography, Space, Spin, Flex, Select } from "antd";
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../graphql/mutations';
import { listAuctions as listAuctionsQuery } from '../graphql/queries';

const { Option } = Select;
const client = generateClient();

const AuctionPage = ({ playerInfo, setMoney, money }) => {
  const [auctions, setAuctions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [auctionDuration, setAuctionDuration] = useState(1);
  const [player, setPlayer] = useState("");
  const [loadingBid, setLoadingBid] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const listAuctions = useCallback(async () => {
    try {
      const auctionData = await client.graphql({ query: listAuctionsQuery });
      const auctions = auctionData.data.listAuctions.items.map(auction => {
        const endTime = new Date(parseInt(auction.endTime) * 1000);
        const timeLeft = calculateTimeDifference(endTime);

        return {
          ...auction,
          endTime,
          timeLeft
        };
      });

      setAuctions(auctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  }, []);

  async function createNewAuction() {
    try {
      const formData = form.getFieldsValue();
      const auctionDurationSeconds = auctionDuration * 60 * 60;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      const endTime = currentTimeInSeconds + auctionDurationSeconds;

      const newAuction = {
        carName: formData.carName,
        player: player,
        buy: formData.buy,
        minBid: formData.minBid,
        currentBid: formData.minBid,
        endTime: endTime,
        status: "active",
      };

      await client.graphql({
        query: mutations.createAuction,
        variables: { input: newAuction },
      });
      listAuctions();
      setVisible(false);
    } catch (error) {
      console.error('Error creating a new auction', error);
    }
  }

  const handleOk = () => {
    try {
      createNewAuction();
      setVisible(false);
    } catch (error) {
      console.error('Error creating auction', error);
    }
  };

  const increaseBid = async (auction) => {
    try {
      setLoadingBid(true);
      const increasedBidValue = Math.round(auction.currentBid * 1.1) || Math.round(auction.minBid * 1.1);

      const updatedAuction = {
        id: auction.id,
        carName: auction.carName,
        player: auction.player,
        buy: auction.buy,
        minBid: auction.currentBid || auction.minBid,
        currentBid: increasedBidValue,
        endTime: auction.endTime,
        lastBidPlayer: playerInfo.nickname,
        status: increasedBidValue < auction.buy ? "active" : "finished",
      };

      setMoney(auction.lastBidPlayer === playerInfo.nickname ? money - (increasedBidValue - auction.currentBid) : money - increasedBidValue);

      await client.graphql({
        query: mutations.updateAuction,
        variables: { input: updatedAuction },
      });
      await client.graphql({
        query: mutations.updatePlayer,
        variables: {
          input: {
            id: playerInfo.id,
            money: auction.lastBidPlayer === playerInfo.nickname ? money - (increasedBidValue - auction.currentBid) : money - increasedBidValue
          }
        },
      });

      listAuctions();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBid(false);
    }
  };

  const buyItem = (auctionId) => {
    console.log(`Buy item for auction with ID: ${auctionId}`);
  };

  const listener = async (data) => {
    const { nickname } = data?.payload?.data;
    setPlayer(nickname);
  };

  useEffect(() => {
    listAuctions();
    Hub.listen('auth', listener);
  }, [listAuctions]);

  function calculateTimeDifference(targetTime) {
    const targetDateTime = new Date(targetTime);
    const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor((targetDateTime - currentTime) / 1000);
  
    if (timeDifferenceInSeconds <= 0) {
      return "finished";
    } else if (timeDifferenceInSeconds < 60) {
      return "finishing";
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      const remainingMinutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
    }
  }
  

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>Virtual Car Auction</Typography.Title>
      <Flex justify="center">
        <Button onClick={showModal}>Start auction</Button>
      </Flex>
      <Row gutter={[16, 16]}>
        {auctions.map((auction) => (
          <Col key={auction.id} span={8}>
            <Card title={`${auction.player} - ${auction.carName}`}>
              <Space direction="vertical">
                <Typography.Text>End Time: {calculateTimeDifference(auction.endTime)}</Typography.Text>
                <Typography.Text>{auction.currentBid > auction.minBid ? "Current" : "Minimal"} Bid: ${auction.currentBid || auction.minBid}</Typography.Text>
                <Typography.Text>Buy: ${auction.buy}</Typography.Text>
                <Button onClick={() => increaseBid(auction)} disabled={loadingBid}>
                  {loadingBid ? <Spin /> : "Increase Bid"}
                </Button>
                <Button onClick={() => console.log(auction.lastBidPlayer === playerInfo.nickname)}>Buy</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        visible={visible}
        title="Create a New Auction"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="carName" label="Car Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="minBid" label="Minimal bid" rules={[{ required: true }]}>
            <Input type="number" defaultValue={0} />
          </Form.Item>
          <Form.Item name="buy" label="Buy" rules={[{ required: true }]}>
            <Input type="number" defaultValue={0} />
          </Form.Item>
          <Form.Item name="auctionDuration" label="Auction Duration (hours)" rules={[{ required: true }]}>
            <Select value={auctionDuration} onChange={(value) => setAuctionDuration(value)}>
              <Option value={1}>1 hour</Option>
              <Option value={3}>3 hours</Option>
              <Option value={6}>6 hours</Option>
              <Option value={12}>12 hours</Option>
              <Option value={24}>24 hours</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuctionPage;
