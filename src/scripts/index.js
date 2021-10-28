import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import swRegister from './utils/sw-register';
import App from './views/app';
import CONFIG from './config/config';

import './utils/register-webcomponent';

const app = new App({
  root: document.querySelector('#root'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
