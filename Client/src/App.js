import React from 'react';

function App() {
  const [userData, setuserData] = React.useState({
    name: '',
    age: '',
    occupation: '',
    id: ''
  });
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [occupation, setOccupation] = React.useState('');
  const [id, setId] = React.useState('');

  
  
  const onSubmitdata = async() => {
     const fetchs = await fetch("http://localhost:3001/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        age: age,
        occupation: occupation,
        id: id
      })
    })
    const data = await fetchs.json();
    if(data){
      alert("data added successfully");
    }
    console.log(data);
  }

   //get data from server and set to userData
  const onGetdata = async() => {
    const fetchs = await fetch("http://localhost:3001/get", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: id
      })
    })
    try{
      const data = await fetchs.json();
      setuserData(data);
      console.log(data);
      if(data === "not found"){
        alert("user not found");
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <h1>My app</h1>    
          <input type="text" name="name" placeholder="name" onChange={(event)=>{setName(event.target.value)}} />
          <input type="text" name="age" placeholder="age" onChange={(event)=>{setAge(event.target.value)}}/>
          <input type="text" name="occupation" placeholder="occupation" onChange={(event)=>{setOccupation(event.target.value)}}/>
          <input type="text" name="id" placeholder="id" onChange={(event)=>{setId(event.target.value)}}/>
          <button type="submit" onClick={onSubmitdata}>Submit</button>      
        
      </div>

      <div>
        <h1>Query Data</h1>
          <input type="text" name="id" placeholder="id" onChange={(event)=>{setId(event.target.value)}}/>
          <button type="submit" onClick={onGetdata}>Submit</button>
          <div>
          <h1>{userData.name}</h1>
          <h1>{userData.age}</h1>
          <h1>{userData.occupation}</h1>
          <h1>{userData.id}</h1>
        </div>
      </div>
    </>
  );




}

export default App;
