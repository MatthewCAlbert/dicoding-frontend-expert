class Layout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._content = this.innerHTML;
    this._navOpened = false;
    this._bodyScrolled = 0;
    this.render();
  }

  setMobileNav(open) {
    this._navOpened = open;
    if (open) {
      this._header.classList.add("scrolled");
      this._navMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      this._navMenu.classList.remove("active");
      document.body.style.overflow = "unset";
      if (!(this._bodyScrolled > 80)) this._header.classList.remove("scrolled");
    }
  }

  hook() {
    this._navMenu = this.querySelector(".nav-wrapper");
    this._header = this.querySelector(".header");
    window.addEventListener("resize", () => {
      if (document.body.clientWidth >= 576 && this._navOpened) {
        this.setMobileNav(false);
      }
    });
    window.addEventListener("scroll", (e) => {
      this._bodyScrolled = document.documentElement.scrollTop;
      if (this._bodyScrolled > 80) {
        this._header.classList.add("scrolled");
      } else if (!this._navOpened) {
        this._header.classList.remove("scrolled");
      }
    });
    this.querySelector(".mobile-nav-toggler").addEventListener("click", () => {
      this.setMobileNav(!this._navOpened);
    });

    this.querySelector(".scroll-up-btn").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  render() {
    this.innerHTML = `
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
      <main class="main-container">
        ${this._content}
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
    `;

    this.hook();
  }
}

customElements.define("app-layout", Layout);
