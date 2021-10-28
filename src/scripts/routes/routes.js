import FavoriteRestaurantList from '../views/pages/favorite-restaurant-list';
import LandingPage from '../views/pages/landing';
import OtherPage from '../views/pages/other';
import RestaurantDetail from '../views/pages/restaurant-detail';
import DefaultLayout from '../views/templates/default';

const routes = {
  '/': {
    layout: DefaultLayout,
    content: LandingPage,
  }, // default page
  '/restaurant/:id': {
    content: RestaurantDetail,
  }, // resto detail
  '/favorite': {
    content: FavoriteRestaurantList,
  }, // example other page
  '/other': {
    content: OtherPage,
  }, // example other page
};

export default routes;
