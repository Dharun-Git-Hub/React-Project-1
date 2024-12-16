import React, { useState, useContext, useRef, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const inputRef = useRef(null);
  const [mic, setMic] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input) {
      onSent();
    }
  };

  const handleCard = (newValue) => {
    if (inputRef.current) {
      inputRef.current.value = newValue;
    }
    setInput(newValue);
  };

  useEffect(() => {
    if (resultData && mic) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(resultData);
      window.speechSynthesis.speak(utterance);
    }
    else{
       window.speechSynthesis.cancel();
    }
  }, [resultData, mic]);



  return (
    <div className="main">
      <div className="nav">
        <p>Chat-Bot</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hii !</span></p>
              <p>How can I help you?</p>
            </div>
            <div className="cards">
              <div onClick={() => handleCard("What about today ?")} className="card">
                <p>What about today ?</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div onClick={() => handleCard("What is AI ?")} className="card">
                <p>What is AI ?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div onClick={() => handleCard("How an AI will be useful for Human ?")} className="card1">
                <p>How an AI will be useful for Human ?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div onClick={() => handleCard("Shall we do some Math or Code ?")} className="card1">
                <p>Shall we do some Math or Code ?</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              className="in"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
              ref={inputRef}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              { !mic?<img title="Speak" onClick={() => setMic(prev => !prev)} src={assets.speaker_icon} alt="" /> 
              :
              <img title="Stop-Speak" onClick={() => setMic(prev => !prev)} src={assets.speaker_on} alt="" />
            }
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            This is gemini Clone you can use it from here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
