// CustomHeader.js
import React, { } from 'react';
import { Flex, Menu } from 'antd';

const CustomHeader = ({ nickname, money, user }) => {
  return (
    <Flex justify="flex-end">
      <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
        <Menu.Item key="1" style={{ float: 'right' }}>{user.username}</Menu.Item>
        <Menu.Item key="2" style={{ float: 'right' }}>{`Money: $${money}`}</Menu.Item>
      </Menu>
    </Flex>
  );
};

export default CustomHeader;
