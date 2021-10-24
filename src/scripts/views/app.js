import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import DefaultLayout from './templates/default';
import DrawerInitiator from '../utils/drawer-initiator';
import Page404 from './pages/404';
import BaseLayout from './templates/base';

class App {
  constructor({ root }) {
    this._root = root;
    this._drawer = null;
    this._layout = null;

    this._initialAppShell();
  }

  _initialAppShell() {
    this.renderPage();
  }

  _isLayoutChanged(Layout) {
    return !this._layout || this._layout.name !== Layout.name;
  }

  _renderLayout(Layout = DefaultLayout) {
    if (this._isLayoutChanged(Layout)) {
      // Clean Up (onUnmount)
      if (typeof this?._cleanUpLayout === 'function') this?._cleanUpLayout();

      this._layout = new Layout(this._root);
      this._root.innerHTML = this._layout.render();
      this._drawerElement = this._layout.hookDrawer();

      if (this._drawerElement) {
        this._drawer = DrawerInitiator.init({
          button: this._drawerElement.button,
          drawer: this._drawerElement.drawer,
          onClose: this._drawerElement?.onClose,
          onOpen: this._drawerElement?.onOpen,
        }); 
      }

      const cleanUp = this._layout.afterRender(this?._drawer);

      this._cleanUpLayout = () => {
        if (this?._drawer) this?._drawer?.detach();
        if (typeof cleanUp === 'function') cleanUp();
      };
    }
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);
    const pageContent = routes[url]?.content;
    const usedLayout = routes[url]?.layout;

    if (pageContent) {
      this._renderLayout(usedLayout || DefaultLayout);
      this._layout.content = await pageContent?.render();
      const cleanUp = await pageContent.afterRender();
    } else {
      // Not Found
      this._renderLayout(BaseLayout);
      this._layout.content = await Page404.render();
    }
  }
}

export default App;
