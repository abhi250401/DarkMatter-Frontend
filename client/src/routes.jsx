import React from 'react';
import jwt_decode from 'jwt-decode';

//	Public pages
const FirstPage = React.lazy(() => import( /*webpackChunkName: 'index'*/ './pages/index'));
const Error = React.lazy(() => import( /*webpackChunkName: 'error'*/ './pages/error'));
const Login = React.lazy(() => import( /*webpackChunkName: 'loginWithPassword'*/ './pages/loginWithPassword'));
const Phone = React.lazy(() => import( /*webpackChunkName: 'loginValidate'*/ './pages/loginValidate'));
const A = React.lazy(() => import( /*webpackChunkName: 'index'*/ './pages/Signup/Signup'));
// const Register = React.lazy(() => import( /*webpackChunkName: 'login'*/ './pages/login'));
// const Checkout = React.lazy(() => import( /*webpackChunkName: 'index'*/ './pages/Signup/userBasic'));

//	User pages
// const Navbar = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/navbar'));
const Home = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/home'));
const EditUser = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/userEdit'));
const DeleteUser = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/userDelete'));
const UserProfile = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/userProfile'));
// const Stock = React.lazy(() => import( /*webpackChunkName: 'stock'*/ './pages/stock'));
const Stock = null;

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

const Routes = [
	{
		path: '/signup',
		params: [],
		element: <A user={user} />
	},
	{
		path: '/login',
		params: [],
		element: <Login user={user} />
	},
	{
		path: '/phone',
		params: [],
		element: <Phone />
	},
	{
		path: '/signin',
		params: [],
		element: <Phone user={user} />
	},
	//	Admin Paths
	{
		path: '/admin/settings',
		params: [],
		element: <Error />
	},
	{
		path: '/edit/:id',
		params: [],
		element: <EditUser />
	},
	{
		path: '/delete/:id/',
		params: [],
		element: <DeleteUser />
	},
	{
		path: '/user/profile/:id',
		params: [],
		element: <UserProfile />
	},
	{
		path: '/admin/users',
		params: [],
		element: <Admin user={user} />
	},
	{
		path: '/delete/stock/:id',
		params: [],
		element: <DeleteStock />
	},

	{
		path: '/edit/stock/:id',
		params: [],
		element: <EditStock />
	},
	{
		path: '/admin/stock/add',
		params: [],
		element: <AddStock />
	},
	{
		path: '/admin/stocks',
		params: [],
		element: <Stocks user={user} />
	},
	//	User paths
	{
		path: '/user/stock/:id',
		params: ['id'],
		element: <Stock user={user} />
	},
	{
		path: '/user/profile',
		params: [],
		element: <UserProfile />
	},
	{
		path: '/user',
		params: [],
		element: <Home user={user} />
	},
	{
		path: '/home',
		params: [],
		element: <Home user={user} />
	},
	{
		path: '/',
		exact: true,
		params: [],
		element: <FirstPage />
	},
	{
		path: '*',
		exact: false,
		params: [],
		element: <Error />
	}
];

export default Routes;