import React from 'react';

const MailConfirmPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/logout',
			component: React.lazy(() => import('./logut'))
		}
	]
};

export default MailConfirmPageConfig;
