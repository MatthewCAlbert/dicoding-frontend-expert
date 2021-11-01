import RestaurantModel from '../src/scripts/data/restaurant.model';
import * as TestFactories from './helpers/testFactories';
import { delay } from './helpers/utils';

describe('Unliking A Restaurant', () => {
  beforeAll(async () => {
    await RestaurantModel.resetAll();
  });

  beforeEach(async () => {
    await RestaurantModel.putRestaurant({ id: 1, favorite: true });
  });

  afterEach(async () => {
    await RestaurantModel.removeRestaurant(1);
  });

  it('should be able to unlike restaurant in the list', async () => {
    const button = await TestFactories.createLikeButtonWithRestaurant({ id: 1, favorite: true });

    document.querySelector(button).dispatchEvent(new Event('click'));

    await delay(50);

    expect(document.querySelector('[favorite="0"]'))
      .toBeTruthy();

    const unlikedMovie = await RestaurantModel.getRestaurant(1);
    expect(unlikedMovie).toEqual({ id: '1', favorite: false });
  });

  it('should not add restaurant to list if id not exist', async () => {
    const button = await TestFactories.createLikeButtonWithRestaurant({ id: 2, favorite: true });

    document.querySelector(button).dispatchEvent(new Event('click'));

    const restaurant = await RestaurantModel.getRestaurant(2);
    expect(restaurant).toBeFalsy();
  });
});
