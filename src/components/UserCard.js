import { useState } from "react"
import { useForm } from "react-hook-form"

const UserCard = ({userObj, onDelete, onEdit}) => {
//Estado para mostrar el formulario para editar datos
  const [showEdit, setShowIsEdit] = useState(false)
  const {register, handleSubmit} = useForm()

//Funcion para mandar los datos nuevos al handlerEdit y agregar el id
  const onSubmit = (res) => {
    Object.defineProperty(res, 'id', {value: userObj.id})
    onEdit(res)
  }
//Formulario de edicion con los valores por defecto y campos requeridos
  const EditForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
          
          <label htmlFor="first_name">First name: </label>
          <input id="first_name" defaultValue={userObj.first_name} required='required' {...register('first_name')} />

          <label htmlFor="last_name"> Last Name: </label>
          <input id="last_name" defaultValue={userObj.last_name} required='required' {...register('last_name')} />
          <br />
          <label htmlFor="birthday" defaultValue={userObj.birthday}>Birthday: </label>
          <input id="birthday" type='date' required='required' defaultValue={userObj.birthday} {...register('birthday')} />
          <br />
          <label htmlFor="email">Email: </label>
          <input id="email"  required='required' defaultValue={userObj.email} {...register('email')} />
          <br />
          <label htmlFor="password" >Password: </label>
          <input id="password" type='password' defaultValue={userObj.password} required='required' {...register('password')} />
          <br />
          <input type="submit" value='Update' />
      </form>
    )
  }

  return (
    <div>
        <h1>{userObj.first_name}  {userObj.last_name} </h1>
        <h2>{userObj.email}</h2>
        <h3>{userObj.birthday}</h3>
        <span>
            <button onClick={() => onDelete(userObj.id)} > Delete </button>
            <button onClick={() => setShowIsEdit(!showEdit)} > Edit </button>
        </span>
        {showEdit? <EditForm/> : <div></div>  }
    </div>
  )
}

export default UserCard