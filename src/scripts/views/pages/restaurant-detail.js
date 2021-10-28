import restaurantService from '../../services/restaurant.service';
import RestaurantModel from '../../data/restaurant.model';
import UrlParser from '../../routes/url-parser';

const RestaurantDetail = {
  async render() {
    return `
      <app-section first-no-bg>
        <h1>Haiya</h1>
      </app-section>
    `;
  },
  
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url?.id;
    let restaurantDetail;
    try {
      const response = await restaurantService.getDetail(restaurantId);
      restaurantDetail = response?.restaurant;
    } catch (error) {
      restaurantDetail = await RestaurantModel.getRestaurant(restaurantId);
    }
  },
};

export default RestaurantDetail;
