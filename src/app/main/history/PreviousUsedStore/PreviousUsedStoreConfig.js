import React from 'react';


const PreviousUsedStoresPagePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/previous-used-store',
			component: React.lazy(() => import('./PreviousUsedStore'))
		}
	]
};

export default  PreviousUsedStoresPagePageConfig ;
