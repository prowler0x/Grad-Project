import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";

import SubmitComponent from "../../../component/Forms/SubmitComponent";
import { User } from "../../Website/Context/UserContext";
import axios from "axios";

export default function CreateStaduim(){
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [link,setLink]=useState("")
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
    const [error,setEmailError]=useState('')
    console.log(image);
    const [accept,setAccept]=useState(false);
    // const [flag,setFlag]=useState(false)
    // console.log("HEELLO");
    const userNow =useContext(User);
    console.log(userNow);
    // useEffect(()=>{
    //     setName(props.name);
    //     setLastName(props.secondName);
    //     setEmail(props.email);
    // },[props.name,props.secondName,props.email])
    // The problem here
   async function Submit(e) {
        let flag =true;
        e.preventDefault();
        setAccept(true)
        if(name===''||price.length==0){
            flag=false;
        }else {
            flag=true;
        }
        // console.log(flag);
        try {
                const formData=new FormData();
                formData.append('name',name)
                formData.append('description',description)
                formData.append('price',price)
                formData.append('avatar',image)
                formData.append('link',link)
                let response=await axios.post('http://localhost:5001/api/stadium',
                  formData
                );
                window.location.pathname="dashboard/user/stadia";
                const token =response.data.token;
                const userDetails =response.data.data;
                userNow.setAuth({token,userDetails})
            
    

    
            
        } catch (error) {
            console.log(error.response.status)
            
                setEmailError("ERROR")
            
        }
        
    }
    return(
        <div className='root t1'>
            <form action="" className="wrapper" onSubmit={Submit}>
                <h1>Create Stadium</h1>
                <div className="input-box">
                    <input type="text"  id="name" placeholder=" Name"  value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                {name.length==0 &&accept &&<p className="error">Name is required </p>}
                <div className="input-box">
                    <input type="number"  id="price" placeholder=" Price"  value={price} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                {price.length==0&&accept &&<p className="error">Some Thing Wrong with prise </p>}
                <div className="input-box">
                    <input type="text" name="" id="description" placeholder="Description"b value={description} required onChange={(e)=>setDescription(e.target.value)}/>
               </div>
                {/* {price.length==0 &&accept &&<p className="error">prise is required </p>} */}
                <div className="input-box-image">
                    <input type="file"  id="image" required onChange={(e)=>setImage(e.target.files.item(0))} name="Upload Photo" />
               </div>
                <div className="input-box">
                    <input type="text" value={link}  required onChange={(e)=>setLink(e.target.value)}  />
               </div>
           
           
                <button className="btn" type="submit">Create Stadium</button>
            
        </form>
            </div>
    )
}

