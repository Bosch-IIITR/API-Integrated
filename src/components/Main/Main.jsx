import React, { useContext } from 'react' 
import './Main.css'  
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'  
 
const Main = () => {  

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context) 
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSent(input);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('Image uploaded:', reader.result);
                // You can now use reader.result which is the base64 encoded image
            };
            reader.readAsDataURL(file);
        } else {
            console.warn('Please upload an image file.');
        }
    };

    const handleMicClick = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                console.log('Voice recognition started. Try speaking into the microphone.');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                onSent(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Error occurred in recognition: ' + event.error);
            };

            recognition.onend = () => {
                console.log('Voice recognition ended.');
            };

            recognition.start();
        } else {
            console.warn('Speech recognition not supported in this browser.');
        }
    };

  return ( 
    <div className='main'> 
        <div className="nav"> 
        <div className="nav-title">
                    <img src={assets.bosch_icon} alt="Logo" className="logo" />
                    <p>Power Tools Finder</p>
                </div> 
            <img src={assets.user_icon} alt="" /> 
        </div> 
        <div className="main-container"> 
 
                {!showResult  
                ?<> 
                    <div className="greet"> 
                <p><span>Hello,</span></p> 
                <p>How can I Assist you today?</p>  
            </div>   
            <div className="cards">  
                <div className="card"> 
                    <p>Which power tool should I use for rapid screw tightening?</p> 
                    <img src={assets.compass_icon} alt="" /> 
                </div> 
                <div className="card"> 
                    <p>Which power tool is beginner-friendly for basic DIY tasks?</p> 
                    <img src={assets.bulb_icon} alt="" /> 
                </div> 
                <div className="card"> 
                    <p>Which power tool is ideal for demanding drilling and fastening jobs?</p> 
                    <img src={assets.message_icon} alt="" /> 
                </div> 
                <div className="card">  
                    <p>Which power tool is ideal for quickly drilling pilot holes and driving screws?</p>
                    <img src={assets.code_icon} alt="" /> 
                </div> 
            </div>  
                </> 
                : <div className='result'>   
                    <div className="result-title"> 
                        <img src={assets.user_icon} alt="" /> 
                        <p>{recentPrompt}</p> 
                    </div> 
                    <div className="result-data"> 
                        <img src={assets.bosch_icon} alt="" /> 
                        { loading 
                        ? <div className='loader'> 
                            <hr /> 
                            <hr /> 
                            <hr /> 
                        </div> 
                        : <p dangerouslySetInnerHTML={{__html:resultData}}></p>  
                        } 
                        
                    </div> 
                </div> 
                }
 
            
            <div className="main-bottom">   
                <div className="search-box"> 
                    <input onChange={(e) => setInput(e.target.value)}
                     value={input} 
                     type="text"
                     placeholder='Enter a prompt here' 
                     onKeyPress={handleKeyPress}  />
                
                <div> 
                    <img src={assets.gallery_icon} alt="" onClick={() => document.getElementById('imageUpload').click()}/> 
                    <input 
                                id="imageUpload" 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={handleImageUpload} 
                            />
                    <img src={assets.mic_icon} alt="" onClick={handleMicClick}/> 
                    { input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null } 
                </div> 
            </div> 
            <p className='bottom-info'> 
                
                Bosch Project in Collaboration with  IIIT Raichur.
            </p>
            </div>
        </div>
        
    </div>
  )
}

export default Main