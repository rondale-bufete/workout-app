import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './css/styles.css'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const apiUrl = process.env.REACT_APP_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user) {
            setError('You must be logged in')
            return
        }
        const workout = {title, sets, reps}
         
        const response = await fetch(`${apiUrl}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setSuccess(null)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setTitle('')
            setSets('')
            setReps('')
            setError(null)
            setEmptyFields([])
            setSuccess(json.message)
            console.log('New Workout Added', json)

            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

        
    }

    useEffect(() => {
        let timeoutId;

        if (success || error) {
            timeoutId = setTimeout(() => {
                setSuccess(null); // Clear success message
                setError(null); // Clear success message
            }, 5000); // 5 seconds
        }

        return () => { // Cleanup function
            clearTimeout(timeoutId); // Clear timeout if component unmounts or success changes
        };
    }, [success, error]);


    return(
        <form className="create" onSubmit={handleSubmit}>

            <h3>ADD A NEW WORKOUT</h3>
            
            <label>Exercise Name:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Number of Sets:</label>
            <input 
                type="number"
                onChange={(e) => setSets(e.target.value)}
                value={sets}
                className={emptyFields.includes('sets') ? 'error' : ''}

            />

            <label>Number of Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}

            />

            <button>ADD WORKOUT</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    )
}

export default WorkoutForm