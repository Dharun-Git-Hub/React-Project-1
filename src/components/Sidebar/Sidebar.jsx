import React, { useContext, useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const [dark, setDark] = useState(false);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const elementRef = useRef(null);

  useEffect(() => {
    if (dark) {
      document.documentElement.style.setProperty('--background-color', 'black');
      document.documentElement.style.setProperty('--color','white');
      document.documentElement.style.setProperty('--dark-hover','white');
      document.documentElement.style.setProperty('--dark-clr','black');
      document.documentElement.style.setProperty('--input-border','0.2px solid grey');
      document.documentElement.style.setProperty('--card-back','black');
      document.documentElement.style.setProperty('--sidebar-color','#121212');
      if (elementRef.current) {
        elementRef.current.innerText = 'Light';
      }
    } else {
      document.documentElement.style.setProperty('--background-color', 'white');
      document.documentElement.style.setProperty('--color','black');
      document.documentElement.style.setProperty('--dark-hover','black');
      document.documentElement.style.setProperty('--dark-clr','white');
      document.documentElement.style.setProperty('--input-border','none');
      document.documentElement.style.setProperty('--card-back','#f0f4f9');
      document.documentElement.style.setProperty('--sidebar-color','#f0f4f9');
      if (elementRef.current) {
        elementRef.current.innerText = 'Dark';
      }
    }
  }, [dark]);

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu" />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img onClick={() => setExtended(prev => !prev)} title="History" src={assets.history_icon} alt="" />
          {extended ? <p onClick={() => setExtended(prev => !prev)} >Activity</p> : null}
        </div>
        <div title="Dark Mode" className="bottom-item hover-dark">
            <img title="Dark Mode" onClick={() => setDark(prev => !prev)} src={assets.moon_icon} alt="" />
          {extended ? <p title="Dark Mode" className="x" ref={elementRef} onClick={() => setDark(prev => !prev)}>Dark</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img title="About" src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
