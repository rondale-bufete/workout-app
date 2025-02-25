import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const apiUrl = process.env.REACT_APP_API_URL || 'https://node-express-app-hu6k.onrender.com'

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${apiUrl}/api/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            setIsLoading(false)

            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //update authContext
            dispatch({type: 'SIGNUP', payload: json})

            setIsLoading(false)
            return json
        }

    }
    return { signup, error, isLoading }
}
