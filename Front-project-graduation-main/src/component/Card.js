export default function Card(props){
    return ( 
                <div style={{width:"300px",height:"400px",border:"3px dashed black"}}>
                        {/* <img src={props.img}
                         style={{width:'100%',height:'10rem'}}
                          */}
                        <div style={{
                            backgroundImage:`url(${props.img})`,
                            width:"300px",
                            height:"300px",
                            backgroundRepeat:"no-repeat",
                            backgroundSize:"cover",
                            backgroundPosition:"center",
                            borderRadius:"20px"
                        }}>
                        </div>
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between"
                        }}>
                            <h1>
                        {props.name}
                        </h1>   
                       <div>
                       <i className="fa-solid fa-star"></i>  Description:{props.Description}
                        </div>
                        </div>
                       <div>
                        {props.price} $
                       </div>
                       
                       
                
        </div>
    )
}