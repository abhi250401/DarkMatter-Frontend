// import loadable from 'react-loadable';

//	Public pages
import Error from "./pages/error";
import FirstPage from "./pages/index";
import Register from './pages/login';
import Login from './pages/loginWithPassword';
import Phone from "./pages/loginValidate";
import Checkout from "./pages/Signup/userBasic";
import A from "./pages/Signup/Signup"

//	User pages
import Navbar from './pages/navbar';
import Home from './pages/home';
import EditUser from "./pages/userEdit";
import DeleteUser from "./pages/userDelete";
import UserProfile from "./pages/userProfile";

//	Admin pages
import Admin from './admin/users';
import Stocks from "./admin/stocks";
import AddStock from "./admin/addStock";
import EditStock from "./admin/editStock";
import DeleteStock from "./admin/deleteStock";


const token = localStorage.getItem('token') || null;

export default [

	{
		path: '/signup',
		slug: 'signup',
		endpoint: 'signup',
		params: [],
		element: <A UserToken={token} />
	},
	{
		path: '/login',
		slug: 'login',
		endpoint: 'login',
		params: [],
		element: <Login UserToken={token} />
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
		element: <Phone UserToken={token} />
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
		path: '/edit/stock/:id',
		slug: '/edit/stock/:id',
		endpoint: 'stock',
		params: [],
		element: <EditStock />
	},
	{
		path: '/delete/:id',
		slug: '/delete/:id',
		endpoint: 'user',
		params: [],
		element: <DeleteUser />
	},
	{
		path: '/delete/stock/:id',
		slug: '/delete/stock/:id',
		endpoint: 'stock',
		params: [],
		element: <DeleteStock />
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
		element: <FirstPage UserToken={token} />
	},
	{
		path: '*',
		exact: false,
		endpoint: '',
		params: [],
		element: <Error />
	},
	{
		path: '/add/stock',
		exact: true,
		endpoint: '',
		params: [],
		element: <AddStock />
	}
];