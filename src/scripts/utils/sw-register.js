import { Workbox } from 'workbox-window';
import CONFIG from '../config/config';

const swRegister = () => {
  if ('serviceWorker' in navigator && CONFIG.ENABLE_SW) {
    window.addEventListener('load', () => {
      const wb = new Workbox('/sw.js');
    
      wb.register();
    });
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
