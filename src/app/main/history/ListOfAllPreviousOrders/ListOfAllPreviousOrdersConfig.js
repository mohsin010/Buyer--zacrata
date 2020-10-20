import React from 'react';


const ListOfAllPreviousOrdersPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/list-all-previous-orders',
			component: React.lazy(() => import('./ListOfAllPreviousOrders'))
		}
	]
};

export default  ListOfAllPreviousOrdersPageConfig ;
