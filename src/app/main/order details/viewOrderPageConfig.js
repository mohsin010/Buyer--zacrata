import React from 'react';


const ViewOrderPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/view-order',
			component: React.lazy(() => import('./viewOrder'))
		}
	]
};

export default  ViewOrderPageConfig ;
