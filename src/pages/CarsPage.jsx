import React, { useState, useEffect } from "react";
import { Card, Typography, Space, Button, Modal, Form, Input, Select, Upload, message } from "antd";
import { generateClient } from 'aws-amplify/api';
import { listCars as listCarsQuery } from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const { Meta } = Card;
const { Option } = Select;
const { Dragger } = Upload;
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

  const createNewCar = async (values) => {
    try {
      const newCar = {
        make: values.make,
        model: values.model,
        year: values.year,
        price: values.price,
        auctionEndTime: new Date().toISOString(),
        // Add other properties for image handling if needed
      };

      await client.graphql({
        query: mutations.createCar,
        variables: { input: newCar },
      });

      fetchCars();
      setVisible(false);
      message.success('Car created successfully!');
    } catch (error) {
      console.error('Error creating a new car', error);
      message.error('Error creating a new car. Please try again.');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              createNewCar(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => createNewCar(values)}
        >
          <Form.Item name="make" label="Make" rules={[{ required: true, message: 'Please enter the make!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="model" label="Model" rules={[{ required: true, message: 'Please enter the model!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true, message: 'Please enter the year!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="image" label="Image" valuePropName="fileList" getValueFromEvent={normFile} extra="Upload a car image">
            <Dragger name="file" multiple={false} beforeUpload={() => false}>
              <p className="ant-upload-drag-icon">+</p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single upload.</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CarsPage;
