import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterusers,setFilterusers] = useState([]);
  const [isModelOpen,setIsModelOpen] = useState(false);
  const [userData,setUserData] = useState({"name":"","age":"","city":""});

  const getAllUsers = async () => {
    await axios
      .get("http://localhost:6700/users/")
      .then((res) => {
        setUsers(res.data);
        setFilterusers(res.data);
      })
      .catch((error) => console.error);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //Search Function

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText));
    setFilterusers(filteredUsers);
  };

  //Delete User Function

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if(isConfirmed){
    await axios.delete(`http://localhost:6700/users/${id}`).then((res)=> {
      setUsers(res.data);
      setFilterusers(res.data);
    });
  }
  };

  //CloseModel

  const closeModel = () => {
    setIsModelOpen(false);
    // getAllUsers();
  };

  //Add User Details
  const handleAddRecord = () => {
    setUserData({"name":"","age":"","city":""});
    setIsModelOpen(true);
  };

  const handleData = (e) => {
    setUserData({...userData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(userData.id){
      await axios.patch(`http://localhost:6700/users/${userData.id}`,userData).then((res)=>{
      console.log(res);
    }).then(()=>setIsModelOpen(false)).then(()=>getAllUsers());
    }else{
    await axios.post("http://localhost:6700/users",userData).then((res)=>{
      console.log(res);
    }).then(()=>setIsModelOpen(false)).then(()=>getAllUsers());
  }

  closeModel();
  setUserData({name:"",age:"",city:""});
  };

  //Update User Details

  const handleUpdateRecord = (user) => {
    setUserData(user);
    setIsModelOpen(true);
  };

  return (
    <>
      <div className="container">
        <h3>CRUD Application</h3>
        <div className="input-search">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search Text Here"
            onChange={handleSearchChange}
          />
          <button onClick={handleAddRecord} className="btn green">Add Record</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterusers &&
              filterusers.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button onClick={()=>handleUpdateRecord(user)} className="btn green">Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(user.id)} className="btn red">Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModelOpen && (
          <div className="model">
            <div className="model-content">
              <span onClick={closeModel} className="close">&times;</span>
              <h2>{userData.id?"User Record":"Add Record"}</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input type="text"
                 value={userData.name} 
                 name="name" 
                 id="name" 
                 onChange={handleData}/>
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input type="number" value={userData.age} name="age" id="age" onChange={handleData}/>
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input type="text" value={userData.city} name="city" id="city" onChange={handleData}/>
              </div>
              <button className="btn green" onClick={handleSubmit}>{userData.id ? "Update User" : "Add User"}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
