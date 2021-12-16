import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Performance from './components/Performance/Performance';
import Analysis from './components/Analysis/Analysis';
import Shortlist from './components/Shortlist/Shortlist';
import Compare from './components/Compare/Compare';
import StockInfo from './components/StockInfo/StockInfo';
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
const UserLayout = React.lazy(() => import( /*webpackChunkName: 'UserLayout'*/ './pages/layout.user'));
// const Home = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './pages/home'));
const EditUser = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './components/user/userEdit'));
const DeleteUser = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './components/user/userDelete'));
const UserProfile = React.lazy(() => import( /*webpackChunkName: 'adminUsers'*/ './components/user/profile'));
const UserStockInfo = React.lazy(() => import( /*webpackChunkName: 'UserStockInfo'*/ './components/user/stock'));
const UserDashboard = React.lazy(() => import( /*webpackChunkName: 'UserDashboard'*/ './components/user/dashboard'));

//	Admin pages
const Admin = React.lazy(() => import( /*webpackChunkName: 'users'*/ './admin/users'));
const Stocks = React.lazy(() => import( /*webpackChunkName: 'stocks'*/ './admin/stocks'));
const AddStock = React.lazy(() => import( /*webpackChunkName: 'addStock'*/ './admin/addStock'));
const EditStock = React.lazy(() => import( /*webpackChunkName: 'editStock'*/ './admin/editStock'));
const DeleteStock = React.lazy(() => import( /*webpackChunkName: 'deleteStock'*/ './admin/deleteStock'));
//  Check if user is logged in
let user = {};


const token = localStorage.getItem('token') || " ";
if (token !== ' ') {
	const decoded = jwt_decode(token);
	if (decoded.expiry && Date.now() <= decoded.exp * 1000 && decoded.status && parseInt(decoded.status) === 1) {
		user = decoded;
		user.token = token;
	}
	//	To be removed
	if (Date.now() <= decoded.exp * 1000) {
		user = decoded;
		user.token = token;
	}
}
axios.defaults.headers.common['Authorization'] = token;//

console.log(user.role);

const Routes = [
	{
		path: '/',
		element: <FirstPage />
	},
	{
		path: '/signup',
		element: <A user={user} />
	},
	{
		path: '/login',
		element: <Login user={user} />
	},
	{
		path: '/phone',
		element: <Phone />
	},
	{
		path: '/signin',
		element: <Phone user={user} />
	},
	//	Admin Paths
	{
		path: '/admin',

		children: [

			{
				path: 'stocks/:id',
				element: <Error user={user} />
			},
			{
				path: 'stocks',
				element: <Stocks user={user} />
			},
			{
				path: 'users/:id/edit',
				element: <EditUser user={user} />
			},
			{
				path: 'users/:id',
				element: <UserProfile user={user} />
			},
			{
				path: 'users',
				element: <Admin user={user} />
			},
		]
	},
	//	User paths
	{
		path: '/user',
		element: <UserLayout user={user} />,
		children: [
			/*{
				path: 'stocks/compare',
				element: <CompareStocks user={user} />
			},
			{
				path: 'stocks/performance',
				element: <StocksPerformance user={user} />
			},*/
			{
				path: 'stock/:id',
				element: <UserStockInfo user={user} />,
				children: [
					{
						path: 'Performance',
						element: <Performance />
					},

					{
						path: 'Analysis',
						element: <Analysis />
					},
					{
						path: 'Shortlist',
						element: <Shortlist />
					},
					{
						path: 'Compare',
						element: <Compare />
					}
				]
			},


			{
				path: 'profile/edit',
				element: <EditUser user={user} />
			},
			{
				path: 'profile',
				element: <UserProfile user={user} />
			},
			{
				path: '',
				element: <UserDashboard user={user} />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
];

export default Routes;