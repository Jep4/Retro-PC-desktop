import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "./MainWindow.css"
import moment from 'moment';

interface Message {
    id: string;
    body: string;
    created: string;
}

function ChatWindow() {
    
    const [data, setData] = useState([]);
    const [idValue, setIdValue] = useState("");
    const [messageValue, setMessageValue] = useState("");

    useEffect(()=>{
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const res = await axios.get("http://localhost:8080/api");
            setData(res.data);
        }
        catch(e){
            console.error("Error fetching data:", e);
        }
    }

    const newMessage = async () => {
        try{
        await axios.post("http://localhost:8080/api", {
            id: idValue,
            body: messageValue,
            created: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        });

        await fetchData();

        setIdValue('');
        setMessageValue('');}
        catch(e){
            console.log("Error sending message: ", e)
        }
    }

    const tempMessage = data;
    return (
        <div className='chat-wrapper'>
            <div className='old-messages'>
                {tempMessage.map((msg: Message, index: number) => (
                    <div className='msg' key={index}>
                        <span className='chat-user'>{msg.id}@desktop $ </span>
                        {msg.body}
                        &nbsp;
                        &nbsp;
                        {moment(msg.created).format("HH:mm")}
                        <button className='message-delete'>X</button>
                    </div>
                ))}
            </div>
            <form className='message-input-field' onSubmit={(e) => { e.preventDefault(); newMessage(); }}>
                <input className='user-input' name="id-value" placeholder='Username' required 
                onChange = {(e)=>setIdValue(e.target.value)} ></input>
                <input className='message-input' name="message-value" placeholder='Enter your message...' required
                onChange = {(e)=>setMessageValue(e.target.value)} value={messageValue}></input>
                <button className='submit-btn' type='submit'></button>
            </form>
        </div>
    );
}

export default ChatWindow;