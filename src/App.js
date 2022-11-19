import logo from './logo.svg';
import './App.css';
import memeimg from '../src/images/memegen.png';
// import memesdata from '../src/memedata.js';
import {useState,useEffect} from 'react';

function App() {

   const [meme, setmeme] = useState({
    toptext: "",
    bottomtext: "",
    randomimage: "https://i.imgflip.com/30b1gx.jpg",
   });


   const [allmeme, setallmeme]= useState([]);


   useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res=>res.json())
      .then(data=> setallmeme(data.data.memes))
   },[])

   function getimage(){
    // const allmeme=allmeme.data.memes;
    const randomnumber = Math.floor(Math.random()*allmeme.length);
    const url = allmeme[randomnumber].url;
    setmeme(prevmeme=>({
      ...prevmeme,
      randomimage: url,
    }));
   }

   function handlechange(event){
    const {name, value} = event.target;
    setmeme(prevmeme=>({
      ...prevmeme,
      [name]:value
    }));

   }
   const [left,setleft]= useState(700);

   function moveleft(){
    setleft(prev =>
      prev=prev-5
    )
   } 

   const dStyle={
      
      left : `${left}px`,
   };

  return (
    <div>
      <nav className='nav'>
         <img src={memeimg} className='navimg' />
      </nav>
      <div className='cont'>
          <div className='input'>
            <input className='forminput' type='text' placeholder='Top Text' name='toptext' value={meme.toptext} onChange={handlechange}/>
            <input className='forminput' type='text' placeholder='Bottom Text' name='bottomtext' value={meme.bottomtext} onChange={handlechange} />
            

          </div>
          <div className='b'>
          <button className='button' onClick={getimage} >Click here to get a new image</button>
         <button className='button' onClick={moveleft}>click to move left</button>
          </div>

          <div className='memeimg'>
          <img src={meme.randomimage} className='mi' />
          <h2 className='memetoptext' style={dStyle}>{meme.toptext}</h2>
          <h2 className='memebottext'>{meme.bottomtext}</h2>
          </div>
          
      </div>

    </div>
  );
}

export default App;
