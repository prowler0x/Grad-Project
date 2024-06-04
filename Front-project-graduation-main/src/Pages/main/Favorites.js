
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../Website/Context/UserContext"
import Card from "../../component/Card"
import './main.css'
import HeaderMain from "./HeaderMain"
import ScrollReveal from 'scrollreveal';
import Cookies from "universal-cookie"


export default function Favorites() {
  const cookies = new Cookies();
  const user_details=cookies.get('userDetails')
    const nav =useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [stadia,setStadia]=useState([])
    const [img,setImage]=useState([])
    const [runUseEffect,setrunUseEffect]=useState(0)

    const context=useContext(User)
    const token=context.auth.token;
     //GET All Staduims
    useEffect(()=>{
        axios
        .get('http://localhost:5001/api/stadium',{headers:{
            Accept:"application/json",
            Authorization:"Bearer "+token
        }})

        .then((res)=>{
          setFavorites([...user_details.favorites]);
            var arr=[];
            for (let i = 0; i < res.data.data.stadiums.length; i++) {
                 arr.push (res.data.data.stadiums[i].avatar);
            }
            console.log(favorites)
            setImage(arr);
            setStadia(res.data.data.stadiums);
        })
    },[runUseEffect])

    const toggleFavorite = async (stadiumId) => {
        
      try {
          const response = await axios.post(`http://localhost:5001/api/stadium/${
            favorites.includes(stadiumId) ? 'removeFromFavorites' : 'addToFavorites'
          }`, {
            userId:user_details._id,
            staduimId:stadiumId
          });
          console.log(response.data.favorites)
          setFavorites(response.data.favorites);

        } catch (error) {
          console.error('Error toggling favorite:', error);
        }
      };

      // var staduim_all=[];
      // for(var i=0;i<favorites.length;i++){
      //   for(var j=0;j<stadia.length;j++){
      //     if(favorites[i]===stadia[j]._id){
      //       staduim_all.push(stadia[i]);
      //     }
      //   }

      // }
    //   console.log(staduim_all);
    // const filteredStadiums1 =stadia.filter(stadium =>
    //     stadium._id===favorites
    //     ).map((stadium)=>{

    //     });
      const matchingStadiums = stadia.filter(stadium => favorites.includes(stadium._id));
     
    
    // console.log("favorites",favorites);
    // console.log("Stadia :",stadia);
    // console.log("Matching staduims is ",matchingStadiums);
    
  
      // console.log(filteredStadiums1);
    const filteredStadiums = matchingStadiums.filter(stadium =>
        stadium.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const showStadia=filteredStadiums.map((stadium,index)=><div>
        <div style={{textAlign:"center",fontSize:"20px"}}>{stadium.name}</div>       
    <div class="portfoilo-box">
    <div style={{
        backgroundImage:`url(${`http://localhost:5001/uploads/${img[index]}`})`,
        width:"100%",
        height:"300px",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        backgroundPosition:"center",
        borderRadius:"10px"
    }} className="img">
    </div>
        <div class="portfolio-layer">
            <h4>{stadium.name}</h4>
            <p>{stadium.description}</p>
            <p> {stadium.price} $</p>      
            <Link to={`${stadium._id}`} className="btn-link" >
        <i className="fa-solid fa-arrow-up-from-bracket" style={{
            color:"#74afb9",
            fontSize:"20px",
            padding:"4px",
            cursor:'pointer'
        }}></i>
        </Link>          
        <Link to={stadium.link} className="link">To Staduim</Link>
        <div style={{ cursor: 'pointer' }} onClick={() => toggleFavorite(stadium._id)}>
            {
            favorites.includes(stadium._id) ? (
              <span style={{ color: 'red' }}>❤️</span> // Filled heart
            ) : (
              <span>🤍</span> // Outline heart
            )}
          </div>
        </div>
    </div>
    </div>
    
    )
        return <html>
            <body>
           
            <div>
        <div class="search-container">
        <input type="text"
          placeholder="Search by stadium name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
          // style={{width:"100%"}}
        />
        </div>
        <section class="portfolio" id="portfoilo">
               <div class="portflio-container">
            {showStadia.length!==0?showStadia:<h6 style={
                {display:"flex",
                justifyContent:"center",
                alignItems:"center"
                ,fontSize:"60px"
                ,color:"#0ef"
                }}>Some Thing Went Wrong </h6>}
                </div>   

    </section>
    </div>;
      
    </body> </html>}
