import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

//create the user hook
const useAuth = props => {
    const { currentUser } = useSelector(mapState);

    // only unmount if user is not current user
    useEffect(() => {
        if (!currentUser) {
            props.history.push('./login')
        }
    }, [currentUser]);

    return currentUser;
};

export default useAuth;