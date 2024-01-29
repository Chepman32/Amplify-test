import "./auctionPage.css"
const { Card, Space, Typography, Col } = require("antd");

const getImageSource = (carName) => {
    const imageName = `${carName}.png`;
    return require(`../../assets/images/${imageName}`);
};

export const SelectedAuctionDetails = ({ selectedAuction }) => {

  return (
      <Col className="auctionDetails" span={12} style={{ height: '100%', padding: '20px' }}>
          {selectedAuction && (
              <Col span={12} style={{ padding: '20px' }}>
              {selectedAuction && (
                  <Card title={<h3>{`${selectedAuction.carName.toUpperCase()}`} </h3>} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Space direction="vertical" style={{ flex: 1 }}>
                          <div style={{ flex: 1, overflow: 'hidden' }}>
                          <img
                              src={getImageSource(selectedAuction.carName)}
                              alt="Auction"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                      </div>
                          <Typography.Text>
                              Bid: ${selectedAuction.currentBid || selectedAuction.minBid}
                          </Typography.Text>
                          <Typography.Text>
                              Buy: ${selectedAuction.buy}
                          </Typography.Text>
                      </Space>
                  </Card>
              )}
          </Col>
          
          )}
      </Col>
  );
};
