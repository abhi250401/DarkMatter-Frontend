// import loadable from 'react-loadable';

//	Public pages
import Error from "./pages/error";
import FirstPage from "./pages/index";
import Register from './pages/login';
import Login from './pages/loginWithPassword';
import Phone from "./pages/loginValidate";
import Checkout from "./pages/Signup/userBasic";
import A from "./pages/signup"

//	User pages
import Navbar from './pages/navbar';
import Home from './pages/home';
import EditUser from "./pages/userEdit";
import DeleteUser from "./pages/userDelete";
import UserProfile from "./pages/userProfile";

//	Admin pages
import Admin from './pages/adminUsers';
import Stocks from "./pages/adminStocks";

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