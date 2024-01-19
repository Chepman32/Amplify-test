import React, { useState, useEffect } from "react";
import { Card, Typography, Space, Button, Modal, Form, Input, Select } from "antd";
import { generateClient } from 'aws-amplify/api';
import { listCars as listCarsQuery } from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const { Meta } = Card;
const { Option } = Select;
const client = generateClient();

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchCars = async () => {
    try {
      const carData = await client.graphql({ query: listCarsQuery });
      setCars(carData.data.listCars.items);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const createNewCar = async () => {
    try {
      const formData = form.getFieldsValue();

      const newCar = {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        auctionEndTime: new Date().toISOString(),
      };

      await client.graphql({
        query: mutations.createCar,
        variables: { input: newCar },
      });

      fetchCars();
      setVisible(false);
    } catch (error) {
      console.error('Error creating a new car', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>List of Cars</Typography.Title>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Create New Car
      </Button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {cars.map((car) => (
          <Card
            key={car.id}
            style={{ height: '20vh', width: '100%', marginBottom: '20px' }}
          >
            <Space direction="horizontal">
              <Meta title={`${car.make} ${car.model} - ${car.year}`} description={`Price: $${car.price}`} />
            </Space>
          </Card>
        ))}
      </div>
      <Modal
        visible={visible}
        title="Create a New Car"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={createNewCar}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="make" label="Make" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="model" label="Model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CarsPage;
