import React, { useState } from 'react'
import axios from 'axios';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const[image,setImage]=useState(null);
    const [address,setAddress]=useState('');

    const handleFormSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);
      formData.append('image', image);
      formData.append('address', address);
    
      try{

      
      await axios.post('http://localhost:5000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      setName('');
      setPassword('');
      setImage(null);
      setAddress('');
    }catch(error){
      console.error(error)
    }
    };
    

return (
     <form onSubmit={handleFormSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>

          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} required/>

          <textarea placeholder="address" value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>

          <button type="submit">Register</button>
     </form>
  )
}

export default RegistrationForm
