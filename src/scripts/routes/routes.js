import LandingPage from '../views/pages/landing';
import OtherPage from '../views/pages/other';
import DefaultLayout from '../views/templates/default';

const routes = {
  '/': {
    layout: DefaultLayout,
    content: LandingPage,
  }, // default page
  '/other': {
    content: OtherPage,
  }, // example other page
  '/other/:id': {
    content: OtherPage,
  }, // example other page
};

export default routes;
