import restaurantService from '../../services/restaurant.service';
import RestaurantModel from '../../data/restaurant.model';

class RestaurantContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._fetched = false;
    this._content = this.innerHTML;
    this._searchTarget = 0;
    this._restaurantData = [];
    this._availableCity = [];
    this._query = {
      value: '',
      city: '',
    };

    this.render();
  }

  switchTarget(index) {
    this._searchTarget = index;
    document.querySelector(
      '.searchbar-category-selector .btn-bg',
    ).style.transform = `translateX(${index * 120}px)`;
    this._catSelector?.forEach((el, id) => {
      if (index !== id) el.classList.remove('active');
      else el.classList.add('active');
    });
  }

  queryListener(q = {}) {
    this._query = { ...this._query, ...q };
    this.querySelector('.restaurant-items-container').innerHTML = '<loading-indicator></loading-indicator>';

    if (this._query?.value !== q?.value || !this?.fetched) {
      this._fetched = true;
      this.fetchData(q?.value || '').then(() => {
        this.renderResult(this._restaurantData);
      });
    } else this.renderResult(this._restaurantData);
  }

  renderResult(data) {
    const filteredData = [...data].filter(
      (el) => el?.city?.match(new RegExp(`${this._query?.city}`, 'i')),
    );

    this.querySelector('.restaurant-items-container-result span').innerHTML = String(filteredData?.length);
    const rendered = filteredData?.map(
      (el) => `
            <restaurant-card data-id="${el?.id}" title="${el?.name}" rating="${el?.rating}" img="${el?.pictureId}" location="${el?.city}" ${el?.favorite ? 'favorite' : ''}>${el?.description}</restaurant-card>
          `,
    )
      .join('');
    this.querySelector('.restaurant-items-container').innerHTML = rendered;
  }

  async reloadCities(restaurantData) {
    let changed = false;

    restaurantData?.forEach((el) => {
      if (!this._availableCity.includes(el?.city)) {
        this._availableCity.push(el?.city);
        changed = true;
      } 
    });

    if (changed) {
      const cityOptionElement = document.querySelector('.homepage-hero-searchbar-city-selector');
      cityOptionElement.innerHTML = '<option value="">All Location</option>';
      this._availableCity.sort();
      this._availableCity.forEach((el) => cityOptionElement.innerHTML += `<option value="${el}">${el}</option>`);
      if (this._query?.city) {
        this._citySelectorInput.value = this._query?.city;
      }
    }
  }

  async fetchData(query = '') {
    let response = {};
    if (!query) {
      response = await restaurantService.getAllList();
    } else {
      try {
        response = await restaurantService.search(query);
      } catch (error) {
        response.restaurants = await RestaurantModel.searchRestaurant(query);
      }
    }
    response.restaurants = response?.restaurants ? response.restaurants : [];

    // Sync with IDB
    this._restaurantData = await Promise.all(response.restaurants.map(async (el) => {
      await RestaurantModel.putRestaurant(el);
      const currentData = await RestaurantModel.getRestaurant(el.id);
      return currentData;
    }));

    this.reloadCities(this._restaurantData);
  }

  hook() {
    this.queryListener();

    this._searchBarInput = document.querySelector(
      '.homepage-hero-searchbar > input',
    );
    this._citySelectorInput = document.querySelector(
      '.homepage-hero-searchbar-city-selector',
    );
    this._searchBarInput.addEventListener('keyup', (el) => {
      this.queryListener({ value: el.target.value });
    });
    this._citySelectorInput.addEventListener('change', (el) => {
      this.queryListener({ city: el.target.value });
    });

    this._catSelector = document.querySelectorAll(
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
      <div class="restaurant-items-container-result">
        <p><span></span> result found.</p>
      </div>
      <div class="restaurant-items-container">
      </div>
    `;

    this.hook();
  }
}

customElements.define('restaurant-container', RestaurantContainer);
