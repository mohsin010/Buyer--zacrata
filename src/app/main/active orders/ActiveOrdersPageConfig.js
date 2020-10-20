import React from 'react';


const ActiveOrdersPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/active-orders',
			component: React.lazy(() => import('./ActiveOrderPage'))
		}
	]
};

export default  ActiveOrdersPageConfig ;
