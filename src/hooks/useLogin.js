import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const apiUrl = process.env.REACT_APP_API_UR

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
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
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            return json
        }

    }
    return { login, error, isLoading }
}
