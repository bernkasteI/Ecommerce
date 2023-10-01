import { useAuth } from './../customHooks/';

//HOC - lets you reuse component logic across multiple components
//useAuth - custom react hook
const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;