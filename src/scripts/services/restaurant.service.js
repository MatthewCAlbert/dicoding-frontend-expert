import { apiProvider } from '../config/api';
import CONFIG from '../config/config';

const restaurantService = {
  _baseServiceUrl: CONFIG.BASE_IMAGE_URL,
  _api: apiProvider(CONFIG.KEY),

  /**
   * Get All Restaurant List
   * @returns {any}
   */
  async getAllList() {
    const url = `${this._baseServiceUrl}list`;
    const response = await this._api.get(url);
    const data = response.json();
  },

  /**
   * Get Restaurant Detail by ID
   * @param {string} restaurantId
   * @returns {any}
   */
  async getDetail(restaurantId) {
    const url = `${this._baseServiceUrl}detail/${restaurantId}`;
    const response = await this._api.get(url);
    const data = response.json();
  },

  /**
   * Search Restaurant by Name
   * @param {string} query
   * @returns {Promise}
   */
  async search(query) {
    const url = `${this._baseServiceUrl}search?q=${query}`;
    const response = await this._api.get(url);
    const data = response.json();
  },

  /**
   * Add a New Restaurant Review by ID
   * @param {string} {id
   * @param {string} name
   * @param {string} review}
   * @returns {any}
   */
  async addNewReview({ id, name, review }) {
    const url = `${this._baseServiceUrl}review`;
    const response = await this._api.post(url, { id, name, review });
    const data = response.json();
    return { id, name, review };
  },

  /**
   * Get CDN Link for Restaurant Images
   * @param {string} pictureId
   * @param {'small'|'medium'|'large'} size
   * @returns {string}
   */
  cdn(pictureId, size) {
    if (!['small', 'medium', 'large'].includes(size)) return '';
    const url = `${this._baseServiceUrl}images/${size}/${pictureId}`;
    return url;
  },
};

export default restaurantService;
