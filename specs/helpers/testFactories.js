import '../../src/scripts/utils/register-webcomponent';

const createLikeButtonWithRestaurant = async (restaurant) => {
  document.querySelector('favorite-button')?.remove();
  document.body.innerHTML += `<favorite-button long favorite="${restaurant?.favorite ? 1 : 0}" target-id="${restaurant?.id}"></favorite-button>`;
  return 'favorite-button button';
};

export { createLikeButtonWithRestaurant };
