import React from 'react'
import { Typography, Icon } from 'antd'
import Chatbot from './Section/Chatbot';
const { Title } = Typography;


function ChatbotPage() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Title level={2} > CHAT BOT APP&nbsp;<Icon type="robot" /></Title>
            </div>
            <hr style={{ width: '80%' }} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Chatbot />
            </div>
        </div>
    )
}

export default ChatbotPage
