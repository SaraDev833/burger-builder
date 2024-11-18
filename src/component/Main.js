import { Navigate, Route, Routes } from "react-router-dom";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Header from "./header/Header";
import Orders from "../component/Order/Orders"
import Checkout from "./Order/Checkout/Checkout";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";
import { authCheck } from "./redux/AuthActionCreator";
import { useEffect } from "react";
import Logout from "../component/Auth/Logout";  
const mapStateToProps = state => ({
    token: state.token,
    userId: state.userId,
});

const mapDispatchToProps = dispatch => ({
    authCheck: () => dispatch(authCheck()),
});
const Main = ({ token, authCheck }) => {

    useEffect(() => {
        authCheck();
    }, [authCheck]); // Dependency array to call authCheck once on mount

    return (
        <div>
            <Header />
            <Routes>
                {token ? (
                    <>
                        <Route path="/BurgerBuilder" element={<BurgerBuilder />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="*" element={<Navigate to="/BurgerBuilder" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/Auth" element={<Auth />} />
                        <Route path="*" element={<Navigate to="/Auth" replace />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
