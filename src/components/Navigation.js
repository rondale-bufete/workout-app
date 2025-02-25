import { Link } from 'react-router-dom'
import './css/styles.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

import { FaUserAlt } from 'react-icons/fa'


const Navigation = () => {
    
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>MY APP</h1>
                </Link>
                <nav>
                    {!user && (
                        <div>
                            <Link to='/login'>LOGIN</Link>
                            <Link to='/signup'>SIGNUP</Link> 
                        </div>   
                    )}
                    
                    {user && (
                        <div className='user-logged'>
                            <span className='user-auth'>{user.name} <FaUserAlt/> </span>
                            <button className='logout' onClick={handleLogout}>Logout</button>
                        </div> 
                    )}
                    
                </nav>
            </div>
        </header>
    )
}
export default Navigation;