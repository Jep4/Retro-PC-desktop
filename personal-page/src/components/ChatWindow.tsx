import React from 'react';
import "./MainWindow.css"


function ChatWindow() {

    const tempMessage ={user: ["Jooeun", "Jooeun", "Jooeun"], msgs: ["Hello, worldddd", "My name is ...", "Sample message 3"]}

    return (
        <div className='chat-wrapper'>
            <div className='old-messages'>
                {tempMessage.msgs.map((msg, index)=>(
                    <div className='msg' key={index}>
                        <span className='chat-user'>{tempMessage.user[index]}@desktop $ </span>
                        {msg}
                        <button className='message-delete'>X</button>
                    </div>
                ))}
            </div>
            <form className='message-input-field'>
                <input className='user-input' placeholder='Username' required></input>
                <input className='message-input' placeholder='Enter your message...' required></input>
                <button className='submit-btn' type='submit'></button>
            </form>
        </div>
    );
}

export default ChatWindow;