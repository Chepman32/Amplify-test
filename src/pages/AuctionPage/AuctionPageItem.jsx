import { Button, Card, Col, Space, Spin, Typography } from 'antd'
import React, { useState } from 'react'
import { calculateTimeDifference } from '../../functions'

export default function AuctionPageItem({ auction, increaseBid, buyItem }) {
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [loadingBid, setLoadingBid] = useState(false);

    const bid = async (auction) => {
        setLoadingBid(true)
        await increaseBid(auction)
        setLoadingBid(false)
    }

  return (
    <Col key={auction.id} span={8}>
            <Card title={`${auction.player} - ${auction.carName}`}>
              <Space direction="vertical">
                <Typography.Text>End Time: {calculateTimeDifference(auction.endTime)}</Typography.Text>
                <Typography.Text>{auction.currentBid > auction.minBid ? "Current" : "Minimal"} Bid: ${auction.currentBid || auction.minBid}</Typography.Text>
                <Typography.Text>Buy: ${auction.buy}</Typography.Text>
                <Button onClick={() => bid(auction)} disabled={loadingBid}>
                  {loadingBid ? <Spin /> : "Increase Bid"}
                </Button>
                <Button onClick={() => buyItem(auction)} disabled={loadingBuy} >
                {loadingBuy ? <Spin /> : "Buy"}
                </Button>
              </Space>
            </Card>
          </Col>
  )
}
