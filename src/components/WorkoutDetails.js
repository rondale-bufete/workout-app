import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
//date formatter
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ( {workout} ) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if(!user) { return }
        
        const response = await fetch('https://node-express-app-tb7g.onrender.com/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p> - <strong>Sets: </strong>{workout.sets}</p>
            <p> - <strong>Reps: </strong>{workout.reps}</p>
            <p className="date-added">
                {workout.createdAt 
                    ? `added ${formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}` 
                    : ""}  {/* Or a suitable fallback */}
            </p>
            <span className="material-symbols-outlined trash" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;