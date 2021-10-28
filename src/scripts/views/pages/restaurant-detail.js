import restaurantService from '../../services/restaurant.service';
import RestaurantModel from '../../data/restaurant.model';
import UrlParser from '../../routes/url-parser';

const RestaurantDetail = {
  async render() {
    return `
      <app-section center class="restaurant-detail" first-no-bg id="detail">
        <loading-indicator></loading-indicator>
      </app-section>
    `;
  },
  
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url?.id;
    let restaurantDetail;
    try {
      const response = await restaurantService.getDetail(restaurantId);
      const localResponse = await RestaurantModel.getRestaurant(restaurantId);
      restaurantDetail = { ...localResponse, ...response?.restaurant };
    } catch (error) {
      restaurantDetail = await RestaurantModel.getRestaurant(restaurantId);
    }
    if (restaurantDetail?.id) {
      // load
      console.log(restaurantDetail);
      document.querySelector('#detail > .section-inner').innerHTML = `
        <lazy-image data-src="${restaurantService.cdn(restaurantDetail.pictureId, 'medium')}" width="100%" alt="${restaurantDetail?.name}"></lazy-image>
        <favorite-button target-id="${restaurantDetail?.id}" favorite="${restaurantDetail?.favorite ? 1 : 0}" long></favorite-button>
        <h1>${restaurantDetail?.name}</h1>
        <p>${restaurantDetail?.description}</p>
        <p>${restaurantDetail?.city}</p>
        <p>${restaurantDetail?.rating}</p>
        <p>${restaurantDetail?.categories?.map((el) => (`${el?.name}`))?.join(', ')}</p>
      `;
    } else {
      // not found
      document.querySelector('#detail > .section-inner').innerHTML = `
        <div class="d-flex flex-column align-items-center text-center">
          <img src="/images/404-illust.svg" width="300" alt="404 Not Found"/>
          <span style="font-weight:bold; font-size: 1.5rem;">Not Found</span>

          <div>
            <p>Lost your way?</p>
            <a href="/#" class="btn btn-primary">Go Back Home</a>
          </div>
        </div>
      `;
    }
  },
};

export default RestaurantDetail;
