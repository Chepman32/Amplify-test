// CustomHeader.js
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const CustomHeader = (nickname, user, money) => {
  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="cars">
        <Link to="/cars">Cars</Link>
      </Menu.Item>
      <Menu.Item key="auctions">
        <Link to="/auctions">Auctions</Link>
      </Menu.Item>
    </Menu>
  );
};

export default CustomHeader;
