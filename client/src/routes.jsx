import React from 'react';
import jwt_decode from 'jwt-decode';

//	Public pages
const FirstPage = React.lazy(() => import( /*webpackChunkName: 'index'*/ './pages/index'));
const Error = React.lazy(() => import( /*webpackChunkName: 'error'*/ './pages/error'));
const Register = React.lazy(() => import( /*webpackChunkName: 'login'*/ './pages/login'));
const Login = React.lazy(() => import( /*webpackChunkName: 'loginWithPassword'*/ './pages/loginWithPassword'));
const Phone = React.lazy(() => import( /*webpackChunkName: 'loginValidate'*/ './pages/loginValidate'));
const Checkout = React.lazy(() => import( /*webpackChunkName: 'index'*/ './pages/Signup/userBasic'));
const A = React.lazy(() => import( /*webpackChunkName: 'index'*/ './pages/Signup/Signup'));

//	User pages
const Navbar = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/navbar'));
const Home = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/home'));
const EditUser = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/userEdit'));
const DeleteUser = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/userDelete'));
const UserProfile = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/userProfile'));

//	Admin pages
const Admin = React.lazy(() => import( /*webpackChunkName: 'users'*/ './admin/users'));
const Stocks = React.lazy(() => import( /*webpackChunkName: 'stocks'*/ './admin/stocks'));
const AddStock = React.lazy(() => import( /*webpackChunkName: 'addStock'*/ './admin/addStock'));
const EditStock = React.lazy(() => import( /*webpackChunkName: 'editStock'*/ './admin/editStock'));
const DeleteStock = React.lazy(() => import( /*webpackChunkName: 'deleteStock'*/ './admin/deleteStock'));

//  Check if user is logged in
let user = {};
const token = localStorage.getItem('token') || {};
if (token) {
	const decoded = jwt_decode(token);
	if (decoded.expiry && Date.now() <= decoded.exp * 1000 && decoded.status && parseInt(decoded.status) === 1) {
		user = decoded;
	}

	//	To be removed
	if (Date.now() <= decoded.exp * 1000) {
		user = decoded;
	}
}
// console.log( 'User', user);

export default [
	{
		path: '/signup',
		slug: 'signup',
		endpoint: 'signup',
		params: [],
		element: <A user={user} />
	},
	{
		path: '/login',
		slug: 'login',
		endpoint: 'login',
		params: [],
		element: <Login user={user} />
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
		element: <Phone user={user} />
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
		path: '/home',
		slug: '/home',
		endpoint: 'home',
		params: [],
		element: <Home user={user} />
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
		element: <Admin user={user} />
	},
	{
		path: '/admin/stocks',
		slug: 'admin/stocks',
		endpoint: 'admin/stocks',
		params: [],
		element: <Stocks user={user} />
	},
	{
		path: '/add/stock',
		exact: true,
		endpoint: '',
		params: [],
		element: <AddStock />
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