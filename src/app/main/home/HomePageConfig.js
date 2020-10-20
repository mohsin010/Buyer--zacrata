import React from 'react';

const HomePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/home',
			component: React.lazy(() => import('./HomePage'))
		}
	]
};

export default HomePageConfig;
