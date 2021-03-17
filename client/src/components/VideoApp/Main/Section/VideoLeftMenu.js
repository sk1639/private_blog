import React from 'react'
import { Menu } from 'antd';

const { SubMenu } = Menu;

function VideoLeftMenu(props) {
    const handleClick = e => {
        console.log('click ', e);
    };

    return (
        <>
            <Menu
                onClick={handleClick}
                style={{ width: 200, display: 'block', minHeight: '700px' }}
                defaultSelectedKeys={['1']}
                selectedKeys={props.selectedKey ? props.selectedKey : ['1']}
                mode="inline"
            >
                <Menu.Item key="1">
                    <a href="/VideoApp">Video</a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a href="/video/videoupload">Upload Video</a>
                </Menu.Item>
                <Menu.Item key="3">
                    <a href="/video/favoritevideo">Favorite Video</a>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default VideoLeftMenu
