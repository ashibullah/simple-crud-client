import '../App.css';
import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData();

    const handleUpdate = (e) =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = {name,email};
        console.log(updatedUser);

        fetch(`http://localhost:5000/users/${loadedUser._id}`,
            {
            method: 'PUT',
            headers : {
                'content-type':'application/json'
            },
            body: JSON.stringify(updatedUser)
    })
        .then(res => res.json())
        .then(data=>{
            if(data.modifiedCount){
                alert("Updated Success Fully");
            }
        })

    }

    return (
        <div>
            <h3>Update Data of a user</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={loadedUser?.name} id="" />
                <br />
                <input type="email" name="email" defaultValue={loadedUser?.email} id="" />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;