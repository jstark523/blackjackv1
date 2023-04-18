// import { postUserName } from "../api/axiosConfig"
// import { useState } from "react"
// import "./NewGameForm.css"


// const NewGameForm =(props) =>{
//     const [userName, setUserName] = useState("");

//     const handleNameChange = (event) =>{
//         setUserName(event.target.value);
//     }

//     const handleSubmit = (event) => {
//       event.preventDefault(); 
//       postUserName(userName)
//       .then(response => {
//         props.newGame();
//       })
//       .catch(error => {
//         console.log("error posting user name")
//         console.error(error);
//       })
//     }

//     return (
//       <form onSubmit={handleSubmit}>
//       <div className="nameInput">
//         Enter Name: <input value={userName} onChange={handleNameChange}/>
//       </div>
//       <div>
//         <button type = "submit" className= "newGameButton">New Game</button>
//       </div>
//     </form>
//     )
//   }

// export default NewGameForm