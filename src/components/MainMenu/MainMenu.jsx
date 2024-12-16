import React, { useState } from 'react';
import './MainMenu.css';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const MainMenu = () => {
  const [selectedOption, setSelectedOption] = useState('Select one');
  const [isListVisible, setIsListVisible] = useState(false);
  const navigate = useNavigate();

  const tasks = {
    AI: () => navigate("/main"),
    Youtube: () => navigate("/text-editor"),
    Instagram: () => alert('Navigating to Instagram...'),
    Twitter: () => alert('Navigating to Twitter...'),
    Whatsapp: () => alert('Opening Whatsapp...'),
  };

  const options = [
    { src: assets.gemini_icon, label: 'AI Assistant', task: tasks.AI },
    { src: '/images/youtube.png', label: 'Text Editor', task: tasks.Youtube },
    { src: '/images/instagram.png', label: 'Instagram', task: tasks.Instagram },
    { src: '/images/twitter.png', label: 'Twitter', task: tasks.Twitter },
    { src: '/images/whatsapp.png', label: 'Whatsapp', task: tasks.Whatsapp },
  ];

  const handleOptionClick = (label, task) => {
    setSelectedOption(label);
    setIsListVisible(false);
    task();
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="hero">
      <div className="selector">
        <div id="selectField" onClick={toggleListVisibility}>
          <p id="selectText">{selectedOption}</p>
          <img
            src="/images/arrow.png"
            id="arrowIcon"
            alt="arrow"
            className={isListVisible ? 'rotate' : ''}
          />
        </div>
        <ul id="list" className={isListVisible ? '' : 'hide'}>
          {options.map((option, index) => (
            <li
              key={index}
              className="options"
              onClick={() => handleOptionClick(option.label, option.task)}>
              <img src={option.src} alt={option.label} />
              <p>{option.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;