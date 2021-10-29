const DrawerInitiator = {
  init({
    button, drawer, onClose = () => {}, onOpen = () => {}, 
  }) {
    const btnEvent = (event) => {
      this._toggleDrawer(event, drawer, onClose, onOpen);
    };
    button.addEventListener('click', btnEvent);
    drawer.querySelectorAll('a')?.forEach((link) => {
      link.addEventListener('click', () => {
        this._closeDrawer(null, drawer, onClose);
      });
    });

    return {
      isActive: () => this._isActive(drawer),
      detach: () => this._detach(drawer, btnEvent),
      toggleDrawer: () => this._toggleDrawer(null, drawer, onClose, onOpen),
      openDrawer: () => this._openDrawer(null, drawer, onOpen),
      closeDrawer: () => this._closeDrawer(null, drawer, onClose),
    };
  },
  _detach(button, event) {
    button.removeEventListener('click', event);
  },
  _isActive(drawer) {
    return drawer?.classList?.contains('active');
  },
  _toggleDrawer(event, drawer, onClose, onOpen) {
    event?.stopPropagation();
    if (this._isActive(drawer)) this._closeDrawer(event, drawer, onClose);
    else this._openDrawer(event, drawer, onOpen);
  },
  _openDrawer(event, drawer, onOpen = () => {}) {
    event?.stopPropagation();
    drawer?.classList?.add('active');
    document.body.style.overflow = 'hidden';
    onOpen();
  },
  _closeDrawer(event, drawer, onClose = () => {}) {
    event?.stopPropagation();
    drawer?.classList?.remove('active');
    document.body.style.overflow = 'unset';
    onClose();
  },
};

export default DrawerInitiator;
