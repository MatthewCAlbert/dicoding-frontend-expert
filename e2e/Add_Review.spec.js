const assert = require('assert');
const { nanoid } = require('nanoid');

Feature('Add Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Add new review', async ({ I }) => {
  I.amOnPage('/');

  // Find and locate first restaurant candidate
  const firstRestaurantCard = locate('.restaurant-item-head a').first();
  I.click(firstRestaurantCard);

  // On restaurant detail fill review form
  I.fillField('#name', 'Budi Gemilang');
  const reviewMessage = `Mantab sekali makanannya. ${nanoid(4)}`;
  I.fillField('#review-message', reviewMessage);

  // Submit form
  I.seeElement('#review-form button');
  const formButton = locate('#review-form button').first();
  I.click(formButton);

  // Check review exist
  const visibleReviewItem = await I.grabNumberOfVisibleElements('.restaurant-detail-review-container > div');

  let visibleReviewMessage;
  for (let index = 0; index < visibleReviewItem; index++) {
    visibleReviewMessage = await I.grabTextFrom(locate('.restaurant-detail-review-container .review-content').at(index + 1));
    visibleReviewMessage = visibleReviewMessage.replace(/"$/i, '');
    visibleReviewMessage = visibleReviewMessage.replace(/^"/i, '');
    if (visibleReviewMessage === reviewMessage) break;
  }
  assert.strictEqual(reviewMessage, visibleReviewMessage);
});
