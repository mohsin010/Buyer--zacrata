// import ForgotPasswordPageConfig from './forgot-password/ForgotPasswordPageConfig';
// import ResetPasswordPageConfig from './reset-password/ResetPasswordPageConfig';
import RegisterPageConfig from './auth/register/RegisterPageConfig';
import LoginPageConfig from './auth/login/LoginPageConfig';
import HomePageConfig from './home/HomePageConfig';
import StorePageConfig from './store/StorePageConfig';
import ProductsPageConfig from './products/ProductsPageConfig';
import ProfilePageConfig from './profile/ProfilePageConfig';
import ActiveOrdersPageConfig from './active orders/ActiveOrdersPageConfig';
import historyPagesConfigs from './history/historyConfig';
import CartPageConfig from './cart/CartPageConfig';
import LogoutPageConfig from './auth/mail-confirm/logoutPageConfig'
import ViewOrderPageConfig from './view order/viewOrderPageConfig';
import landingPageConfig from './landing page/landingPageConfig';
// import ViewOrderPageConfig from './order details/viewOrderPageConfig';

const pagesConfigs = [
	LoginPageConfig,
	RegisterPageConfig,
	HomePageConfig,
	StorePageConfig,
	ProductsPageConfig,
	ProfilePageConfig,
	ActiveOrdersPageConfig,
	CartPageConfig,
	ViewOrderPageConfig,
	LogoutPageConfig,
	landingPageConfig,
	// ViewOrderPageConfig,
	...historyPagesConfigs
];

export default pagesConfigs;
