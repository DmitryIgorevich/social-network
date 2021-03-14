import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './navigation/navigation';
import withSuspense from '../api/HOC/withSuspense';
import { Redirect } from 'react-router-dom';

const ProfileContainer = React.lazy(() => import('./profile/profileContainer'));
const LoginContainer = React.lazy(() => import('./login/loginContainer'));
const EditProfileContainer = React.lazy(() => import('./EditProfile/EditProfileContainer'));
const Users = React.lazy(() => import('./users/users'));
// 
let Content = (props) => {
    return (
        <section className='content_section'>
            <div className='container'>
                <div className='content_row'>
                    <Navigation />
                    <div className='content_big'>
                        <Route exact path='/' render={() => <Redirect to='/profile' />} />
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                        <Route path='/login' render={() => withSuspense(LoginContainer)()} />
                        <Route path='/edit' render={() => withSuspense(EditProfileContainer)()} />
                        <Route path='/users' render={withSuspense(Users)} />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Content;
