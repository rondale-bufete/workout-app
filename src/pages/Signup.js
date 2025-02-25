import React from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading}  = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name, email, password)
    }

  return (
    <div className='form-container'>
       <form className='signup' onSubmit={handleSubmit}>
            <h2>CREATE AN ACCOUNT</h2>
            <label>Username:</label>
            <input 
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Email:</label>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={ isLoading }>SIGN UP</button>
            {error && <div className='error'>{error}</div>}
        </form> 
    </div>
  )
}

export default Signup