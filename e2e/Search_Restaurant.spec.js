const assert = require('assert');

Feature('Search Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Name filter', async ({ I }) => {
  I.amOnPage('/');

  // Search with name
  const searchString = 'kafe';
  const matcher = new RegExp(searchString, 'i');

  const visibleRestaurantCard = await I.grabNumberOfVisibleElements('restaurant-card');

  const matchingItems = [];
  for (let index = 0; index < visibleRestaurantCard; index++) {
    const restaurantName = await I.grabTextFrom(locate('.restaurant-item-title').at(index + 1));
    if (restaurantName.match(matcher)) matchingItems.push(restaurantName);
  }

  I.seeElement('.homepage-hero-searchbar > input');
  I.fillField('.homepage-hero-searchbar > input', searchString);

  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  
  const newVisibleRestaurantCard = await I.grabNumberOfVisibleElements('restaurant-card');

  for (let index = 0; index < newVisibleRestaurantCard; index++) {
    const restaurantName = await I.grabTextFrom(locate('.restaurant-item-title').at(index + 1));
    assert.strictEqual(restaurantName, matchingItems[index]);
  }

  assert.strictEqual(newVisibleRestaurantCard, matchingItems.length);

  // Search with name and city
  const availableCityOption = await I.grabNumberOfVisibleElements('.homepage-hero-searchbar-city-selector option');
  const selectRandomCity = Math.ceil(Math.random() * availableCityOption);

  const cityNameOption = await I.grabTextFrom(`option:nth-child(${selectRandomCity})`);

  const matchingWithCityItems = [];
  for (let index = 0; index < newVisibleRestaurantCard; index++) {
    const restaurantCity = await I.grabTextFrom(locate('.restaurant-item-label').at(index + 1));
    if (restaurantCity.match(new RegExp(cityNameOption, 'i'))) matchingWithCityItems.push(restaurantCity);
  }

  I.selectOption('.homepage-hero-searchbar-city-selector', cityNameOption);
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  
  const newVisibleWithCityRestaurantCard = await I.grabNumberOfVisibleElements('restaurant-card');

  for (let index = 0; index < newVisibleWithCityRestaurantCard; index++) {
    const restaurantCity = await I.grabTextFrom(locate('.restaurant-item-label').at(index + 1));
    assert.strictEqual(restaurantCity, matchingWithCityItems[index]);
  }

  assert.strictEqual(newVisibleWithCityRestaurantCard, matchingWithCityItems.length);
});
