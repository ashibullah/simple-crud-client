import { useLoaderData, useNavigate } from 'react-router-dom';
import './App.css';
import { useState  } from 'react';

function App() {

  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers || []); 
  const navigate = useNavigate();
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    if (!name || !email) {
      alert("Please fill out all fields!");
      return;
    }

    const newUser = { name, email };
    console.log(newUser);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {

          setUsers([...users, { ...newUser, _id: data.insertedId }]);
          form.reset(); 
        } else {
          alert('Failed to add user.');
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  const handleEdit =(id)=>{
      navigate(`/users/${id}`);
  }

  const handleDelete =(id)=>{
    fetch(`http://localhost:5000/users/${id}`,{
      method:'delete',
    }).then((res) =>{
    (res.ok)?setUsers(users.filter(u => u._id !== id)):alert("Unable to delete");
    })
  }
  return (
    <>
      <h1>Simple CRUD</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Enter name" />
        <input type="email" name="email" placeholder="Enter email" />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={()=>handleEdit(user._id)} className="btn">Edit</button>
            <button onClick={()=>handleDelete(user._id)} className="btn">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
