import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// parenthesis - for return part of arrow function
// curly braces - object
const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

//create the user hook
const useAuth = props => {
    // grabbing current user that is signed into application, using hook
    const { currentUser } = useSelector(mapState);
    const history = useHistory();

    // only unmount if user is not current user
    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        }
    }, [currentUser]); //returning currentUser, which is used to render page component
                       // [currentUser] sets to state of currentUser, to avoid having to apply effect on every re-render

    return currentUser;
};

export default useAuth;