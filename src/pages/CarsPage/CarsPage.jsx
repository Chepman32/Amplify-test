// CarsPage.js

import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Modal, Form, Input, message, Spin } from "antd";
import { generateClient } from 'aws-amplify/api';
import { listCars as listCarsQuery } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import "./carsPage.css";
import CarDetailsModal from "./CarDetailsModal";

const { Meta } = Card;
const client = generateClient();

const CarsPage = ({ playerInfo, setMoney, money }) => {
  const [cars, setCars] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [form] = Form.useForm();
  const [carDetailsVisible, setCarDetailsVisible] = useState(false);

  const fetchCars = useCallback(async () => {
    try {
      const carData = await client.graphql({ query: listCarsQuery });
      setCars(carData.data.listCars.items);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }, []);

  const buyCar = async (car) => {
    setMoney(money - car.price);
    try {
      setLoadingBuy(true)
      await client.graphql({
        query: mutations.createCarPlayer,
        variables: {
          input: {
            playerId: playerInfo.id,
            carId: car.id
          }
        }
      });

      await client.graphql({
        query: mutations.updatePlayer,
        variables: {
          input: {
            id: playerInfo.id,
            money: money - car.price
          }
        },
      });
      message.success('Car successfully bought!');

    } catch (err) {
      console.log(err)
      message.error('Error buying car');
    }
    finally {
      setLoadingBuy(false)
      setSelectedCar(null)
    }
  };

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const showModal = () => {
    setVisible(true);
  };

  const showCarDetailsModal = () => {
    setCarDetailsVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCarDetailsCancel = () => {
    setCarDetailsVisible(false);
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

  const getImageSource = (make, model) => {
    const imageName = `${make.toLowerCase()} ${model.toLowerCase()}.avif`;
    return require(`../../assets/images/${imageName}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
        Create New Car
      </Button>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }}>
        {cars.map((car) => (
          <div
            key={car.id}
            className="carsPage__item"
            onClick={() => {
              setSelectedCar(car)
              showCarDetailsModal()
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 className="carsPage__model">{car.model}</h3>
              <p className="carsPage__make">{car.make}</p>
            </div>
            <img
              src={getImageSource(car.make, car.model)}
              alt={`${car.make} ${car.model}`}
              style={{ maxWidth: '100%', maxHeight: '50%', borderRadius: '10px' }}
            />
            <p>{car.price}</p>
            <div>
              <div className="carsPage__type">
                <p>{car.type.toUpperCase()} </p>
              </div>
            </div>
          </div>
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

      <CarDetailsModal
        visible={carDetailsVisible && selectedCar !== null}
        handleCancel={handleCarDetailsCancel}
        selectedCar={selectedCar}
        buyCar={buyCar}
        loadingBuy={loadingBuy}
      />
    </div>
  );
};

export default CarsPage;
