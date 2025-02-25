import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import{ useAuthContext } from '../hooks/useAuthContext'

//COMPONENTS
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    const apiUrl = process.env.REACT_APP_API_UR

    useEffect(() => {
        const fetchWorkouts = async() => {
            const response = await fetch(`${apiUrl}/api/workouts/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }   
        if(user) {
          fetchWorkouts()   
        }
        
    })
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails 
                        key={workout._id} workout={workout}
                    />
                ))}
            </div>

            <WorkoutForm />


        </div>
    )
}

export default Home;