const LandingPage = {
  async render() {
    return `
    <landing-content></landing-content>
    `;
  },

  async afterRender() {
    // _exploreResult = document.createElement('restaurant-container');
    // _exploreResult.data = _filteredData;

    // querySelector('.explore-section .section-inner').appendChild(
    //   _exploreResult,
    // );

    // _searchBarInput = querySelector(
    //   '.homepage-hero-searchbar > input',
    // );
    // _citySelectorInput = querySelector(
    //   '.homepage-hero-searchbar-city-selector',
    // );
    // _searchBarInput.addEventListener('keyup', (el) => {
    //   queryListener({ value: el.target.value });
    // });
    // _citySelectorInput.addEventListener('change', (el) => {
    //   queryListener({ city: el.target.value });
    // });

    // _catSelector = querySelectorAll(
    //   '.searchbar-category-selector > button',
    // );

    // _catSelector.forEach((el, index) => {
    //   el.addEventListener('click', () => {
    //     this.switchTarget(index);
    //   });
    // });
  },
};

export default LandingPage;
