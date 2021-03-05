import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="intro">
        <a href="/intro">Intro</a>
      </Menu.Item>
      <SubMenu title={<span>Project</span>}>
        <MenuItemGroup title="React">
          <Menu.Item key="setting:1"><a href="/MovieApp">Movie App</a></Menu.Item>
          <Menu.Item key="setting:2">Video App</Menu.Item>
        </MenuItemGroup>
        {/* <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup> */}
      </SubMenu>
    </Menu>
  )
}

export default LeftMenu