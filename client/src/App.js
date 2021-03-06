import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperienc';
import AddEducation from './components/profile-form/AddEducation';
// Redux
import { Provider } from 'react-redux'; // Provider connects between the react and redux
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    // We want to call loadUser each time the app is loaded, should be the same as "componentDidMount" if we were implementing class
    // The useEffect hook keeps looping. In order to prevent that, we need to add an empty arraty as a second parameter
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <Route
                                exact
                                path='/profile/:id'
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/create-profile'
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/edit-profile'
                                component={EditProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/add-experience'
                                component={AddExperience}
                            />
                            <PrivateRoute
                                exact
                                path='/add-education'
                                component={AddEducation}
                            />
                            <PrivateRoute
                                exact
                                path='/posts'
                                component={Posts}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
