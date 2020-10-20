import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginPageConfig from 'app/main/auth/login/LoginPageConfig';
import pagesConfigs from 'app/main/pagesConfig';
import landingPageConfig from 'app/main/landing page/landingPageConfig';

const routeConfigs = [
	ExampleConfig,
	LoginPageConfig,
	landingPageConfig,
	...pagesConfigs

];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/index" />
	}
];

export default routes;
