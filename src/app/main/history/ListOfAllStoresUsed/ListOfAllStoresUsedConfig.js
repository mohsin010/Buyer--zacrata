import React from 'react';


const ListOfAllStoresUsedPagePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/list-all-used-stores',
			component: React.lazy(() => import('./ListOfAllStoresUsed'))
		}
	]
};

export default  ListOfAllStoresUsedPagePageConfig ;
