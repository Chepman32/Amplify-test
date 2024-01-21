import React, { useState, useEffect } from "react";
import { Card, Typography, Space, Button, Modal, Form, Input, Select, Upload, message } from "antd";
import { generateClient } from 'aws-amplify/api';
import { listCars as listCarsQuery } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import Img from "../../assets/images/2017-ford-focus-electric-hatchback-angular-front.avif"
import "./carsPage.css"

const { Meta } = Card;
const client = generateClient();

const CarsPage = ({ playerInfo, setMoney, money }) => {
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

  const buyCar = async (car) => {
    try {
      await client.graphql({
        query: mutations.createCarPlayer,
        variables: {
          input: {
            playerId: playerInfo.id,
            carId: car.id
          }
        }
      });
      message.success('Car successfully bought!');

    } catch (err) {
      console.log(err)
      message.error('Error buying car');
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
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Create New Car
      </Button>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }}>
        {cars.map((car) => (
          <Card
            key={car.id}
            cover={
              <img src={Img} alt="" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} />
            }
            style={{ height: '20vw', width: '20vw', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: ".5vw", marginBottom: '20px', border: "2px solid #760", borderRadius: '10px' }}
          >
            <Space direction="horizontal">
            </Space>
            <Button onClick={() => buyCar(car)}>
              Buy Car
            </Button>
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
        </Form>
      </Modal>
    </div>
  );
};

export default CarsPage;