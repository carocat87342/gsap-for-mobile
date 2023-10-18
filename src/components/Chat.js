import React from "react";
import logo_trunsp from '../images/logo_trunsp.png'
import chat from '../images/chat.svg'

function Chat() {

    return (
        <div className="chat_wrap">
            <div className="logo_trunspilot">
                <img src={logo_trunsp} alt=""/>
            </div>
            <div className="chat">
                <img src={chat} alt=""/>
            </div>
        </div>
    );
}

export default Chat;