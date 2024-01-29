import { Button, Card, Col, Space, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { calculateTimeDifference } from '../../functions';

const getImageSource = (carName) => {
    const imageName = `${carName}.png`;
    return require(`../../assets/images/${imageName}`);
};

export default function AuctionPageItem({ auction, increaseBid, buyItem, isSelected }) {
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [loadingBid, setLoadingBid] = useState(false);

    const bid = async (auction) => {
        setLoadingBid(true);
        await increaseBid(auction);
        setLoadingBid(false);
    };

    return (
        <Col key={auction.id} span={24} style={{ height: '20%', width: '100%', display: 'flex' }}>
            <Card title={`${auction.player} - ${auction.carName}`} style={{ flex: 1, border: isSelected ? '2px solid #ff69b4' : 'none' }}>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <img
                        src={getImageSource(auction.carName)}
                        alt="Auction"
                        style={{ width: 'auto', height: '10vw', objectFit: "contain", marginRight: '10px' }}
                    />
                    <Space direction="vertical">
                        <Typography.Text>
                            {calculateTimeDifference(auction.endTime) !== 'Finished' && 'End Time:'}{' '}
                            {calculateTimeDifference(auction.endTime)}
                        </Typography.Text>
                        <Typography.Text>
                            {auction.currentBid > auction.minBid ? 'Current' : 'Minimal'} Bid: ${auction.currentBid || auction.minBid}
                        </Typography.Text>
                        <Typography.Text>Buy: ${auction.buy}</Typography.Text>
                        <Button onClick={() => bid(auction)} disabled={loadingBid}>
                            {loadingBid ? <Spin /> : 'Increase Bid'}
                        </Button>
                        <Button onClick={() => buyItem(auction)} disabled={loadingBuy}>
                            {loadingBuy ? <Spin /> : 'Buy'}
                        </Button>
                    </Space>
                </div>
            </Card>
        </Col>
    );
}
