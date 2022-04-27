import { useEffect, useState } from 'react';
import './App.css';
import CreateUserForm from './components/CreateUserForm';
import UserCard from './components/UserCard';
import createNewUser from './services/createNewUser';
import deleteUser from './services/deleteUser';
import getAllUsers from './services/getAllUsers';
import editUser from './services/editUser';

function App() {
//Estados 
  const [users, setUsers] = useState([])
  const [newUser,setNewuser] = useState({})
  const [deleteId, setDeleteId] = useState('')
  const [editObj, setEditObj] = useState({})
  const [displayForm, setDisplayForm] = useState(false)
// Pedido a la API para obtener todos los usuarios
  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data)
      })
  }, [])
// Pedido a la API para crear un nuevo usuario
  useEffect(() => {
    if (newUser.first_name){
      createNewUser(newUser)
        .then((response) => {
          setUsers([response.data, ...users])
          setNewuser({})
        })
    }
  }, [newUser, users])
// Pedido a la API para elimiinar un usuario
  useEffect(() => {
    if (deleteId){
      deleteUser(deleteId)
        .then(() => {
          setUsers(filterUsers(deleteId))
        })
    }
    
  }, [deleteId])
// Pedido a la API para editar un usuario
  useEffect(() => {
    editUser(editObj.id, editObj)
      .then((res) => {
        setUsers([res.data, ...filterUsers(editObj.id)])
      })
  }, [editObj])

  const filterUsers = (id) => {
    const arr = users.filter((user) => id !== user.id)
    return arr
  }

  const handlerOnCreateUser = (event) =>{
    setNewuser(event)
  }

  const handlerOnDelete = (id) => {
    setDeleteId(id)
  }
//funcion para asignar los nuevos datos a actualizar
  const handlerEdit = (editedUser) => {
    setEditObj(editedUser)
  }
//Funcion para crear las cartas de usuarios
  const usersList = users.map((user) => <UserCard userObj={user} onDelete={handlerOnDelete} onEdit={handlerEdit}  key={user.id} />)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setDisplayForm(!displayForm)} >Crear usuario</button>
        {displayForm && <CreateUserForm onCreate={handlerOnCreateUser} />}
        {usersList}
      </header>
    </div>
  );
}

export default App;
