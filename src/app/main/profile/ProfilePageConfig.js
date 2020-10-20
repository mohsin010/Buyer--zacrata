import React from 'react';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/settings',
			component: React.lazy(() => import('./ProfilePage'))
		}
	]
};

export default ProfilePageConfig;
