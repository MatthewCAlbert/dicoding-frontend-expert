const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.seeElement('.not-found');
  I.see('Oops, it seems you don\'t have any favorite restaurant yet.', '.not-found p');
});

Scenario('liking and unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');

  // Find and locate first restaurant candidate
  const firstRestaurantCard = locate('.restaurant-item-head a').first();
  const firstRestaurantTitle = await I.grabTextFrom('.restaurant-item-title');
  I.click(firstRestaurantCard);

  // On restaurant detail add to favorite
  I.seeElement('favorite-button button');
  I.click('favorite-button button');

  // On restaurant favorite list check for existence
  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-card');
  const likedRestaurantCard = locate('.restaurant-item-head a').first();
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item-title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Going back to restaurant detail to unlike
  I.click(likedRestaurantCard);

  I.seeElement('favorite-button button');
  I.click('favorite-button button');

  // Check if not favorite restaurant exist
  I.amOnPage('/#/favorite');

  I.seeElement('.not-found');
  I.see('Oops, it seems you don\'t have any favorite restaurant yet.', '.not-found p');
});
