import './App.css';
import { Navbar } from './components/layouts/Navbar';
import { Landing } from './components/layouts/Landing';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Alert } from './components/layouts/Alert';
import { PrivateRoute } from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/profile-forms/Profile';
import { AddExperience } from './components/profile-forms/AddExperience';
import { Posts } from './components/posts/Posts';
import { Post } from './components/post/Post';
import { AddEducation } from './components/profile-forms/AddEducation';
import { Profiles } from './components/profiles/Profiles';
import { ProfileId } from './components/profile/ProfileId';

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<>
					<Navbar />
					<Alert />
					<Routes>
						<Route exact path='/profiles' element={<Profiles />} />
						<Route exact path='/' element={<Landing />} />
						<Route exact path='/register' element={<Register />} />
						<Route exact path='/login' element={<Login />} />
						<Route exact path='/profile/:id' element={<ProfileId />} />
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/dashboard' element={<Dashboard />} />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/edit-profile' element={<Profile />} />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/add-experience' element={<AddExperience />} />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/add-education' element={<AddEducation />} />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/posts' element={<Posts />} />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/posts/:id' element={<Post />} />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route exact path='/create-profile' element={<Profile />} />
						</Route>
					</Routes>
				</>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
