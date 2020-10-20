import React from 'react';


const StorePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/store',
			component: React.lazy(() => import('./StorePage'))
		}
	]
};

export default  StorePageConfig ;
