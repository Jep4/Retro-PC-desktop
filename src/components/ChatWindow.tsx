import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./MainWindow.css";
import moment from 'moment';
import models from '../../server/models';
import { DataTypes } from 'sequelize';


interface ChatWindowProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  }
  
  
  const ChatWindow: React.FC<ChatWindowProps>=({token, setToken}) =>{
    const [data, setData] = useState([]);
    const [idValue, setIdValue] = useState("");
    const [messageValue, setMessageValue] = useState("");
    const [groupedData, setGroupedData] = useState<[string, typeof models.Message[]][]>([]);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setLoggedIn(localStorage.getItem('token') ? true : false);
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/chat");
            groupData(res.data);
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };

    const groupData = (msgs: typeof models.Message[]) => {
        const grouped: Record<string, typeof models.Message[]> = {};
        msgs.forEach((msg) => {
            const date = moment(msg.createdAt).format("MMM Do");
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(msg);

            setGroupedData(Object.entries(grouped));
        });
    };

    const newMessage = async () => {
        try {
            await axios.post("http://localhost:8080/chat", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                id: idValue,
                body: messageValue,
            });

            await fetchData();

            setIdValue('');
            setMessageValue('');
        } catch (e) {
            console.log("Error sending message: ", e);
        }
    };

    const deleteMessage = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/chat/${id}`);
            fetchData();
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };
    
    return (
        <div className='chat-wrapper'>
            <div className='old-messages'>
                { groupedData.map(([date, messages], index) => (
                    <div key={index}>
                        <div className='date-header'>{date}</div>
                        {messages.map((msg: typeof models.Message, index: number) => (
                            <div className='msg' key={index}>
                                <span className='chat-user'>{msg.user_id}@desktop $ </span>
                                {msg.body}
                                &nbsp;
                                &nbsp;
                                {moment(msg.createdAt).format("HH:mm")}
                                <button className='message-delete' onClick={(e) => { e.preventDefault(); deleteMessage(msg.id) }}>X</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {loggedIn ? (
                <form className='message-input-field' onSubmit={(e) => { e.preventDefault(); newMessage(); }}>
                    <input className='user-input' name="id-value" placeholder='Username' required
                        onChange={(e) => setIdValue(e.target.value)} value={idValue}></input>
                    <input className='message-input' name="message-value" placeholder='Enter your message...' required
                        onChange={(e) => setMessageValue(e.target.value)} value={messageValue}></input>
                    <button className='submit-btn' type='submit'></button>
                </form>
            ) : (
                <div className='login-message'>Please login to use this feature.</div>
            )}
        </div>
    );
    
    
}
export default ChatWindow;
