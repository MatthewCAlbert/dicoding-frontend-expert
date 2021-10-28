import data from '../../data/legacy/DATA.json';
import dataExtra from '../../data/legacy/DATA_EXTRA.json';

class LandingContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._content = this.innerHTML;
    this._searchTarget = 0;
    this.classList.add('main-container');
    this._restaurantData = [...data?.restaurants, ...dataExtra?.restaurants];
    this._filteredData = this._restaurantData;
    this._availableCity = [];
    this._query = {
      value: '',
      city: '',
    };
    this._restaurantData?.forEach((el) => {
      if (!this._availableCity.includes(el?.city)) { this._availableCity.push(el?.city); }
    });
    this._availableCity.sort();

    this.render();
  }

  disconnectedCallback() {
    
  }

  switchTarget(index) {
    this._searchTarget = index;
    this.querySelector(
      '.searchbar-category-selector .btn-bg',
    ).style.transform = `translateX(${index * 120}px)`;
    this._catSelector?.forEach((el, id) => {
      if (index !== id) el.classList.remove('active');
      else el.classList.add('active');
    });
  }

  queryListener(q) {
    this._query = { ...this._query, ...q };
    this._filteredData = [...this._restaurantData].filter(
      (el) => el?.name?.match(new RegExp(`${this._query?.value}`, 'i'))
        && el?.city?.match(new RegExp(`${this._query?.city}`, 'i')),
    );
    this._exploreResult.data = this._filteredData;
  }

  hook() {
    this._exploreResult = document.createElement('restaurant-container');
    this._exploreResult.data = this._filteredData;

    this.querySelector('.explore-section .section-inner').appendChild(
      this._exploreResult,
    );

    this._searchBarInput = this.querySelector(
      '.homepage-hero-searchbar > input',
    );
    this._citySelectorInput = this.querySelector(
      '.homepage-hero-searchbar-city-selector',
    );
    this._searchBarInput.addEventListener('keyup', (el) => {
      this.queryListener({ value: el.target.value });
    });
    this._citySelectorInput.addEventListener('change', (el) => {
      this.queryListener({ city: el.target.value });
    });

    this._catSelector = this.querySelectorAll(
      '.searchbar-category-selector > button',
    );

    this._catSelector.forEach((el, index) => {
      el.addEventListener('click', () => {
        this.switchTarget(index);
      });
    });
  }

  render() {
    this.innerHTML = `
      <app-section first class="homepage-hero" id="hero">
        <div class="w-100">

            <p class="text-center text-white hero-title">Find your next place to eat</p>
            <div class="homepage-hero-searchbar">
                <input class="form-control me-3" type="text" placeholder="Find your restaurant here.." />
                <div>
                    <div class="homepage-hero-searchbar-city-container">
                      <select class="homepage-hero-searchbar-city-selector form-control me-3">
                        <option value="">All Location</option>
                        ${this._availableCity
    ?.map(
      (el) => `<option value="${el}">${el}</option>`,
    )
    .join('')}
                      </select>
                    </div>
                    <button class="btn homepage-hero-searchbar-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>

            <div class="d-flex justify-content-center" style="margin-top: 1.5rem;">
                <div class="searchbar-category-selector">
                    <div class="btn-bg"></div>
                    <button class="btn active">
                        Restaurant
                    </button>
                    <button class="btn">
                        Food
                    </button>
                </div>
            </div>

            <div class="hero-explore-now">
              <p>Don’t know what or where to eat?</p>
              <a href="#explore" class="btn">Explore Now <i class="fas fa-chevron-down"></i></a>
            </div>

        </div>
      </app-section>

      <app-section class="explore-section" id="explore">
        <h1 class="text-center mb-0">Explore Restaurant</h1>
      </app-section>
    `;

    this.hook();
  }
}

customElements.define('landing-content', LandingContent);
