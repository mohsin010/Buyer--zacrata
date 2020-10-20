import React from 'react';


const CartPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/view-order',
			component: React.lazy(() => import('./viewOrderPage'))
		}
	]
};

export default  CartPageConfig ;
 