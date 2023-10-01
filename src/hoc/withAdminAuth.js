import { useAdminAuth } from './../customHooks';

//passing children and immediately rendering them, if evaluates to true
// if evaluates to false, redirects user
const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;