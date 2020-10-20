import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

import Fontawsome from 'react-fontawesome';
import React, { useState, useEffect } from 'react';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
const coun = sessionStorage.getItem('coun')
var navigationConfig =[]
coun == 1 ? 
 navigationConfig = [
	{

		id: 'home',
		title: 'Home',
		// translate: 'Home',
		type: 'item',
		icon: "home",
		url: '/home'


	},
	{
		id: 'order-history',
		title: 'Order History',
		translate: 'History',
		type: 'group',
		icon: 'history',
		children: [
			// {
			// 	id: 'previous-used-stores',
			// 	title: 'Previous Used Stores',
			// 	type: 'item',
			// 	// icon: 'history',
			// 	url: '/previous-used-store'
			// },
			{
				id: 'cancelled-orders',
				title: 'Cancelled Orders',
				type: 'item',
				// icon: 'history',
				url: '/cancelled-orders'
			},
			{
				id: 'completed-orders',
				title: 'Completed Orders',
				type: 'item',
				// icon: 'history',
				url: '/completed-orders'
			},
			// {
			// 	id: 'list-all-previous-orders',
			// 	title: 'List of All Previous Orders',
			// 	type: 'item',
			// 	// icon: 'history',
			// 	url: '/list-all-previous-orders'
			// },
			{
				id: 'list-all-used-stores',
				title: 'List of All Used Stores',
				type: 'item',
				// icon: 'history',
				url: '/list-all-used-stores'
			},
		]

	},
	{

		id: 'active-orders',
		title: 'Active Orders',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'whatshot',
		url: '/active-orders'

	},
	{

		id: 'settings',
		title: 'Settings',
		// translate: 'Settings',
		type: 'item',
		icon: 'settings',
		url: '/settings'

	},
	{

		id: 'cart',
		title: 'Cart',
		// translate: 'LogOut',
		type: 'item',
		icon: 'shoppingbasket',
		url: '/cart'
	},
	{

		id: 'logout',
		title: 'Logout',
		// translate: 'LogOut',
		type: 'item',
		icon: 'lock',
		url: '/logout'
	},
	{

		id: 'flag',
		title: '',
		// translate: 'Home',
		type: 'group',
		icon: <img src="https://img.icons8.com/color/48/000000/india.png"/>,
		// url: '',


	}
]
: navigationConfig = [
	{

		id: 'home',
		title: 'Home',
		// translate: 'Home',
		type: 'item',
		icon: "home",
		url: '/home'


	},
	{
		id: 'order-history',
		title: 'Order History',
		translate: 'History',
		type: 'group',
		icon: 'history',
		children: [
			// {
			// 	id: 'previous-used-stores',
			// 	title: 'Previous Used Stores',
			// 	type: 'item',
			// 	// icon: 'history',
			// 	url: '/previous-used-store'
			// },
			{
				id: 'cancelled-orders',
				title: 'Cancelled Orders',
				type: 'item',
				// icon: 'history',
				url: '/cancelled-orders'
			},
			{
				id: 'completed-orders',
				title: 'Completed Orders',
				type: 'item',
				// icon: 'history',
				url: '/completed-orders'
			},
			// {
			// 	id: 'list-all-previous-orders',
			// 	title: 'List of All Previous Orders',
			// 	type: 'item',
			// 	// icon: 'history',
			// 	url: '/list-all-previous-orders'
			// },
			{
				id: 'list-all-used-stores',
				title: 'List of All Used Stores',
				type: 'item',
				// icon: 'history',
				url: '/list-all-used-stores'
			},
		]

	},
	{

		id: 'active-orders',
		title: 'Active Orders',
		// translate: 'Active Orders',
		type: 'item',
		icon: 'whatshot',
		url: '/active-orders'

	},
	{

		id: 'settings',
		title: 'Settings',
		// translate: 'Settings',
		type: 'item',
		icon: 'settings',
		url: '/settings'

	},
	{

		id: 'cart',
		title: 'Cart',
		// translate: 'LogOut',
		type: 'item',
		icon: 'shoppingbasket',
		url: '/cart'
	},
	{

		id: 'logout',
		title: 'Logout',
		// translate: 'LogOut',
		type: 'item',
		icon: 'lock',
		url: '/logout'
	},
	,
	{

		id: 'flag',
		title: '',
		// translate: 'Home',
		type: 'group',
		icon: <img src="https://img.icons8.com/color/48/000000/usa.png"/>,
		// url: '',


	}
];
export default navigationConfig;
