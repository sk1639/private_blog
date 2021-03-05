import React from 'react'
import { Menu } from 'antd';

const { SubMenu } = Menu;

function MovieLeftMenu(props) {
    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <>
            <Menu
                onClick={handleClick}
                style={{ width: 200, display: 'block' }}
                defaultSelectedKeys={['1']}
                selectedKeys={props.selectedKey ? props.selectedKey : ['1']}
                mode="inline"
            >
                <Menu.Item key="1">
                    <a href="/MovieApp">MovieApp</a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a href="/movie/favorite">Favorite Movies</a>
                </Menu.Item>
                <Menu.Item key="3">
                    Option 3
          </Menu.Item>
            </Menu>
        </>
    )
}

export default MovieLeftMenu
