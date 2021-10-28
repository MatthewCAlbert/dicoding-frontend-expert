import BaseLayout from './base';

class DefaultLayout extends BaseLayout {
  static get name() {
    return 'default';
  }

  constructor(root) {
    super(root);
    this._root = root;
    this._config = {
      drawer: {
        button: '.mobile-nav-toggler',
        content: '.nav-wrapper',
      },
      content: '.main-container',
    };
  }

  get layoutName() {
    return this._layoutName;
  }

  set content(content) {
    this._content.innerHTML = content;
  }

  get content() {
    return this._content;
  }

  render() {
    return `
      <a href="#main-content" class="skip-link">Go to Content</a>
      <div class="app-layout">
        <header class="header">
            <div class="header-inner">
                <div class="header-logo">
                    <img src="/images/logo.png" alt="logo"/>
                </div>
                <nav>
                  <div class="mobile-nav">
                    <button class="btn mobile-nav-toggler"><i class="fas fa-bars"></i></button>
                  </div>
                  <div class="nav-wrapper">
                    <a href="/">HOME</a>
                    <a href="#">FAVORITE</a>
                    <a href="https://matthewcalbert.com" class="link-special">ABOUT US</a>
                  </div>
                </nav>
            </div>
        </header>
        <main class="main-container" id="main-content">

        </main>
        <div class="scroll-up-btn-wrapper">
          <button class="btn scroll-up-btn"><i class="fas fa-chevron-up"></i></button>
        </div>
        <footer class="footer">
            <div class="footer-inner">
                <p>Copyright ©2021 - GeoCulinary</p>
                <p>Made by Matthew Christopher Albert</p>
            </div>
        </footer>
      </div>
    `;
  }

  hookDrawer() {
    const drawer = this._root.querySelector(this._config.drawer.content);
    const button = this._root.querySelector(this._config.drawer.button);
    const onClose = () => {
      if (!(this?._bodyScrolled > 80)) this._header.classList.remove('scrolled');
    };
    const onOpen = () => {
      this._header.classList.add('scrolled');
    };

    return {
      button, drawer, onClose, onOpen,
    };
  }
  
  afterRender(drawerHook = null) {
    // Hook content DOM to property
    this._content = this._root.querySelector(this._config.content);

    // Auto close mobile nav on resized back to desktop size
    const resizeListener = () => {
      if (document.body.clientWidth >= 576 && this._navOpened) {
        drawerHook?.closeDrawer();
      }
    };
    window.addEventListener('resize', resizeListener);

    // Change Drawer Style on Scroll
    this._header = this._root.querySelector('.header');
    const scrollListener = () => {
      this._bodyScrolled = document.documentElement.scrollTop;
      if (this._bodyScrolled > 80) {
        this._header.classList.add('scrolled');
      } else if (!drawerHook?.isActive()) {
        this._header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', scrollListener);

    // Enable Scroll to Top Button
    this._root.querySelector('.scroll-up-btn').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return () => {
      window.removeEventListener('resize', resizeListener);
      window.removeEventListener('scroll', scrollListener);
    };
  }
}

export default DefaultLayout;
