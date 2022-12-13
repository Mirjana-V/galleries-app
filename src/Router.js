import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Galleries from "./pages/Galleries";
import GalleryPage from "./pages/GalleryPage";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectActiveUser } from '../src/store/auth/selector';
import CreateGalleryPage from "./pages/CreateGalleryPage";
import { useDispatch } from "react-redux";
import { getActiveUser } from "./store/auth/slice";
import { useEffect } from "react";


export default function Router() {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getActiveUser());
        }
    }, [dispatch, isAuthenticated]);

    const PrivateRoute = ({ children, ...rest }) => {
        const isAuthenticated = useSelector(selectIsAuthenticated);

        return (
            <Route {...rest}>
                {isAuthenticated ? children : <Redirect to="/login" />}
            </Route>
        )
    }
    const GuestRoute = ({ children, ...rest }) => {
        const isAuthenticated = !!useSelector(selectIsAuthenticated);
        return (
            <Route {...rest}>
                {!isAuthenticated ? children : <Redirect to="/" />}
            </Route>
        )
    }

    return <Switch>
        <Route exact path='/'>
            <Redirect to='/galleries'></Redirect>
        </Route>
        <Route exact path="/authors/:id">
            <Galleries/>
        </Route>
        <Route path='/galleries' exact>
            <Galleries />
        </Route>
        <GuestRoute path='/login' exact>
            <LoginPage />
        </GuestRoute>
        <GuestRoute path='/register' exact>
            <RegisterPage />
        </GuestRoute>
        <PrivateRoute exact path='/galleries/:id' >
            <GalleryPage />
        </PrivateRoute>
        <PrivateRoute path='/create' exact>
            <CreateGalleryPage />
        </PrivateRoute>
        <PrivateRoute exact path="/my-galleries">
            <Galleries selfId={isAuthenticated ? (activeUser?.id) : null} />
        </PrivateRoute>
        <PrivateRoute exact path ="/edit-gallery/:id">
            <CreateGalleryPage/>
        </PrivateRoute>
    </Switch>
}