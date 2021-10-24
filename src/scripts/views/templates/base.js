class BaseLayout {
  static get name() {
    return 'base';
  }

  constructor(root) {
    this._root = root;
    this._content = root;
    this._config = {
      drawer: {
        button: '',
        content: '',
      },
      content: '',
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
    `;
  }

  /**
   * Hook the Drawer DOM and return it
   * @returns {{
   *  button: HTMLElement
   *  drawer: HTMLElement
   *  onClose?: {(): void}
   *  onOpen?: {(): void}
   * }}
   */
  hookDrawer() {
    if (this._config.drawer.content && this._config.drawer.button) {
      const drawer = this._root.querySelector(this._config.drawer.content);
      const button = this._root.querySelector(this._config.drawer.button);
      return {
        button, drawer,
      };
    }

    return null;
  }

  /**
   * After Render Function, please use after hooking the drawer, returns cleanup function
   * @param {Object} drawerHook=null
   * @returns {{():void}}
   */
  afterRender(drawerHook = null) {
    // Hook content DOM to property
    if (this._config.content !== '') this._content = this._root.querySelector(this._config.content);

    return () => {
    };
  }
}

export default BaseLayout;
