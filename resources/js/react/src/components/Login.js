import { useState } from 'react'

const Login = ({onLogin, onRegister}) => {
    const [email, setText] = useState('')
    const [password, setReminder] = useState('')

  const onReg = () => {
    if (!email) {
      alert('Entrer un login')
      return
    }
    if (!password) {
        alert('Entrer un password')
        return
      }
      onRegister({ email, password })
  }
  const onLog = () => {
    if (!email) {
      alert('Entrer un login')
      return
    }
    if (!password) {
        alert('Entrer un password')
        return
      }
      onLogin({ email, password })
  }

  return (
    <form className='add-form'>
      <div className='form-control'>
        <label>Email</label>
        <input
          type='email'
          placeholder='Entrer un email'
          value={email}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Password</label>
        <input
          type='password'
          placeholder='Entrer un password'
          value={password}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>
      <input type='button' onClick={onReg} value='Register' className='btn btn-block' />
      <input type='button' onClick={onLog} value='Login' className='btn btn-block' />
    </form>
  )
}

export default Login
