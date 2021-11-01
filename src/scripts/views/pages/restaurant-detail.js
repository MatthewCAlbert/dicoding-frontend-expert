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

  renderReview(reviews) {
    document.querySelector('.restaurant-detail-review-container').innerHTML = reviews?.map((el) => (`
    <div>
      <div class="review-author">${el?.name}</div>
      <div class="review-date">${el?.date}</div>
      <div class="review-content">"${el?.review}"</div>
    </div>
    `))?.join('') || '<span><i>No review yet, be the first to add a review!</i></span>';

    document.querySelector('.review-count').innerHTML = reviews?.length || 0;
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
      // console.log(restaurantDetail);
      document.querySelector('#detail > .section-inner').innerHTML = `
        <lazy-image data-src="${restaurantService.cdn(restaurantDetail.pictureId, 'medium')}" width="100%" alt="${restaurantDetail?.name}" style="width:100%;"></lazy-image>

        <div class="restaurant-detail-head d-flex align-items-center justify-content-between w-100" style="margin-top:20px;">
          <div class="d-flex align-items-center">
            <h1 class="my-0">${restaurantDetail?.name}</h1>
            <div class="marker"><i class="fas fa-star" style="margin-left:10px;"></i> ${restaurantDetail?.rating}</div>
          </div>
          <div class="marker">
            <i class="fas fa-map-marker-alt"></i> ${restaurantDetail?.city}
          </div>
        </div>
        
        <p class="text-left w-100 my-0 restaurant-detail-address">${restaurantDetail?.address || 'Address not loaded'}</p>

        <div class="restaurant-detail-head-2 d-flex align-items-center justify-content-between w-100">
          <div class="restaurant-detail-category-container">
            ${restaurantDetail?.categories?.map((el) => (`<div>${el?.name}</div>`))?.join('') || ''}
          </div>
          <div class="d-flex">
            <a class="btn btn-primary" data-link="reviews">Review</a>&nbsp;
            <favorite-button target-id="${restaurantDetail?.id}" favorite="${restaurantDetail?.favorite ? 1 : 0}" long></favorite-button>
          </div>
        </div>

        <p>${restaurantDetail?.description}</p>
        
        <h2>Foods</h2>
        <div class="restaurant-detail-menu-container">
          ${restaurantDetail?.menus?.foods?.map((el) => (`
          <div>
            <i class="fas fa-utensils"></i>
            <div>${el?.name}</div>
          </div>
          `))?.join('') || 'Food not loaded'}
        </div>

        <h2>Drinks</h2>
        <div class="restaurant-detail-menu-container">
          ${restaurantDetail?.menus?.drinks?.map((el) => (`
          <div>
            <i class="fas fa-coffee"></i>
            <div>${el?.name}</div>
          </div>
          `))?.join('') || 'Drink not loaded'}
        </div>

        <h2>Reviews <small>(<span class="review-count"></span>)</small></h2>
        <div class="restaurant-detail-review-container" id="reviews">
        </div>

        <form id="review-form">
          <div>
            <h2 class="text-center">Write Your Review</h2>
            ${navigator?.onLine ? '' : '<p class="offline-warning">You are offline, your review will not be submitted until you\'re online.</p>'}
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" type="text" class="form-control" required/>
            </div>
            <div class="form-group">
              <label for="review-message">Review</label>
              <textarea id="review-message" class="form-control" class="font-control" rows="4" required></textarea>
            </div>
            <button class="btn btn-primary" type="submit"><i class="fas fa-plus"></i>&nbsp; Add New Review</button>
          </div>
        </form>
      `;

      document.querySelectorAll('a[data-link]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const tgt = e.target.getAttribute('data-link');
          document.getElementById(tgt).scrollIntoView({ block: 'end', behavior: 'smooth' });
        });
      });

      this.renderReview(restaurantDetail?.customerReviews || []);
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
      return;
    }

    const form = document.querySelector('#detail form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.querySelector('#name');
      const review = e.target.querySelector('#review-message');
      const reviewData = {
        id: restaurantId,
        name: name.value,
        review: review.value,
      };
      name.disabled = true;
      review.disabled = true;
      restaurantService.addNewReview(reviewData).then((response) => {
        this.renderReview(response?.customerReviews);
        e.target.reset();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        name.disabled = false;
        review.disabled = false;
      });
    });
  },
};

export default RestaurantDetail;
