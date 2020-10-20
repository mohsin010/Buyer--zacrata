import React from 'react';


const CompletedOrdersPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/completed-orders',
			component: React.lazy(() => import('./CompletedOrders'))
		}
	]
};

export default  CompletedOrdersPageConfig ;
