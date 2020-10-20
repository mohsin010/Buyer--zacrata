import React from 'react';


const ProductsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/products',
			component: React.lazy(() => import('./ProductsPage'))
		}
	]
};

export default  ProductsPageConfig ;
