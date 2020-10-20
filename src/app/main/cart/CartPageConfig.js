import React from 'react';


const CartPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/cart',
			component: React.lazy(() => import('./CartPage'))
		}
	]
};

export default  CartPageConfig ;
