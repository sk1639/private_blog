import Axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveMessage, clearMessage } from '../../../_actions/message_action'
import { List, Icon, Avatar } from 'antd';
import Message from './Message';
import Card from './Card';


function Chatbot() {
    const dispatch = useDispatch([]);
    const savedMessages = useSelector(state => state.messages.messages)

    useEffect(() => {
        eventQuery('welcomToMyWebsite')
    }, [])

    const textQuery = async (text) => {
        // step 1, Need to take care of the message I sent
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))


        // step 2, We need to take care of the message Chatbot sent
        const textQueryVariables = {
            text
        }

        try {
            // I will send request to the Query
            const response = await Axios.post('api/chatbot/dialogflow/textQuery', textQueryVariables)

            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }
                dispatch(saveMessage(conversation))

            }


        } catch (error) {
            conversation = {
                who: 'user',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))

        }


    }



    const eventQuery = async (event) => {

        const eventQueryVariables = {
            event
        }

        try {
            // I will send request to the Query
            const response = await Axios.post('api/chatbot/dialogflow/eventQuery', eventQueryVariables)

            for (let content of response.data.fulfillmentMessages) {
                let conversation = {
                    who: 'bot',
                    content: content
                }
                dispatch(saveMessage(conversation))

            }

        } catch (error) {
            let conversation = {
                who: 'user',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }


    }


    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return alert('you need to type something first')
            }

            //we will send request to text query route
            textQuery(e.target.value)

            e.target.value = "";

        }
    }


    const renderCards = (cards) => {
        return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />)

    }

    const renderOneMessage = (message, i) => {
        console.log('message', message)

        //we need to give some condition here to seperate message kinds
        if (message.content && message.content.text && message.content.text.text) {
            //templete for normal text
            return <Message key={i} who={message.who} text={message.content.text.text} />//return <Message key={i} who={message.who} text={message.content.text.text} />
        }
        else if (message.content && message.content.payload.fields.card) {
            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />
            return <div>
                <List.Item style={{ padding: '1rem', display: 'flex', overflowX: 'scroll' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>


            </div>
            //templete for card message

        }


    }


    const renderMessage = (savedMessages) => {
        if (savedMessages) {
            return savedMessages.map((message, i) => {
                return renderOneMessage(message, i);
            })
        } else {
            return null;
        }
    }

    return (
        <div style={{
            height: 700, width: 700, border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessage(savedMessages)}
            </div>

            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '5px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                type="text"
            />
        </div>
    )
}

export default Chatbot
