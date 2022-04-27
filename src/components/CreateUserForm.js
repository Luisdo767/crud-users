import { useForm } from "react-hook-form"

const CreateUserForm = ({onCreate}) => {
    const {register, handleSubmit} = useForm()
//Funcion para enviar datos de nuevo usuario al hanlderCreate
    const onSubmit = (res) => {
        onCreate(res)
    }
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first_name">First name: </label>
          <input id="first_name" required='required' {...register('first_name')} />

          <label htmlFor="last_name"> Last Name: </label>
          <input id="last_name" required='required' {...register('last_name')} />
          <br />
          <label htmlFor="birthday">Birthday: </label>
          <input id="birthday" required='required' type='date' {...register('birthday')} />
          <br />
          <label htmlFor="email">Email: </label>
          <input id="email" required='required' {...register('email')} />
          <br />
          <label htmlFor="password" >Password: </label>
          <input id="password" type='password' required='required' {...register('password')} />
          <br />
          <input type="submit" value='Create' />
      </form>
  )
}

export default CreateUserForm