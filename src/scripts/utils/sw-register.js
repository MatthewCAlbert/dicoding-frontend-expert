import CONFIG from '../config/config';

const swRegister = () => {
  if ('serviceWorker' in navigator) {
    if (navigator.serviceWorker && CONFIG.ENABLE_SW) {
      return navigator.serviceWorker.register('/sw.js').then((registration) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
