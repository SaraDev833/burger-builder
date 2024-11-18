import { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from './../redux/AuthActionCreator';
import { Navigate } from "react-router-dom";

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const Logout = ({ logout }) => {
    useEffect(() => {
        logout();
    }, [logout]);

    // Redirect to the Auth page after logout
    return <Navigate to="/Auth" replace />;
};

export default connect(null, mapDispatchToProps)(Logout);
