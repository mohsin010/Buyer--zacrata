import React from 'react';


const CancelledOrdersonfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/cancelled-orders',
			component: React.lazy(() => import('./CancelledOrders'))
		}
	]
};

export default  CancelledOrdersonfig ;
