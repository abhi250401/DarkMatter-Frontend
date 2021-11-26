// import loadable from 'react-loadable';

import Login from './pages/Newlogin';
import Register from './pages/Newregister';
import Navbar from './pages/navbar';
import Home from './pages/home';
import Admin from './pages/Admin';
import Phone from "./pages/phone";
import A from "./pages/a"
import FirstPage from "./pages/FirstPage";
import Checkout from "./pages/checkout/checkout";
import EditUser from "./pages/Edituser";
import Error from "./Error";
import DeleteUser from "./pages/Deleteuser";
import UserProfile from "./pages/UserProfile";
import Stocks from "./pages/Stocks";
import Multistep from "./pages/Multistep";

export default [
	{
		path: '/home',
		slug: 'home',
		endpoint: 'home',
		params: [],
		element: <Home />
	},
	{
		path: '/signup',
		slug: 'signup',
		endpoint: 'signup',
		params: [],
		element: <A />
	},
	{
		path: '/login',
		slug: 'login',
		endpoint: 'login',
		params: [],
		element: <Login />
	},
	{
		path: '/phone',
		slug: 'phone',
		endpoint: 'phone',
		params: [],
		element: <Phone />
	},
	{
		path: '/signin',
		slug: 'signin',
		endpoint: 'signin',
		params: [],
		element: <Phone />
	},
	{
		path: '/user/profile/:id',
		slug: 'user/profile/:id',
		endpoint: 'user/profile/:id',
		params: [],
		element: <UserProfile />
	},
	{
		path: '/edit/:id',
		slug: '/edit/:id',
		endpoint: 'user',
		params: [],
		element: <EditUser />
	},
	{
		path: '/delete/:id',
		slug: '/delete/:id',
		endpoint: 'user',
		params: [],
		element: <DeleteUser />
	},
	{
		path: '/admin/settings',
		slug: 'admin/settings',
		endpoint: 'admin/settings',
		params: [],
		element: <Error />
	},
	{
		path: '/admin/users',
		slug: 'admin/users',
		endpoint: 'admin/users',
		params: [],
		element: <Admin />
	},
	{
		path: '/admin/stocks',
		slug: 'admin/stocks',
		endpoint: 'admin/stocks',
		params: [],
		element: <Stocks />
	},
	{
		path: '/',
		exact: true,
		endpoint: 'home',
		params: [],
		element: <FirstPage />
	},
	{
		path: '*',
		exact: false,
		endpoint: '',
		params: [],
		element: <Error />
	}
];