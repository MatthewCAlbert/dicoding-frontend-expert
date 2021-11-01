const itActsAsRestaurantModel = (restaurantModel) => {
  it('should return the restaurant that has been added', async () => {
    await restaurantModel.putRestaurant({ id: 1 });
    await restaurantModel.putRestaurant({ id: 2 });

    expect(await restaurantModel.getRestaurant(1))
      .toEqual({ id: '1', favorite: false });
    expect(await restaurantModel.getRestaurant(2))
      .toEqual({ id: '2', favorite: false });
    expect(await restaurantModel.getRestaurant(3))
      .toEqual(undefined);
  });

  it('can return all of the restaurants that have been added', async () => {
    await restaurantModel.putRestaurant({ id: 1 });
    await restaurantModel.putRestaurant({ id: 2 });

    expect(await restaurantModel.getAllRestaurant())
      .toEqual([
        { id: '1', favorite: false },
        { id: '2', favorite: false },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    await restaurantModel.putRestaurant({ id: 1 });
    await restaurantModel.putRestaurant({ id: 2 });
    await restaurantModel.putRestaurant({ id: 3 });

    await restaurantModel.removeRestaurant(1);

    expect(await restaurantModel.getAllRestaurant())
      .toEqual([
        { id: '2', favorite: false },
        { id: '3', favorite: false },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    await restaurantModel.putRestaurant({ id: 1 });
    await restaurantModel.putRestaurant({ id: 2 });
    await restaurantModel.putRestaurant({ id: 3 });

    await restaurantModel.removeRestaurant(4);

    expect(await restaurantModel.getAllRestaurant())
      .toEqual([
        { id: '1', favorite: false },
        { id: '2', favorite: false },
        { id: '3', favorite: false },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    await restaurantModel.putRestaurant({ id: 1, name: 'Restoran A' });
    await restaurantModel.putRestaurant({ id: 2, name: 'Restoran AB' });
    await restaurantModel.putRestaurant({ id: 3, name: 'Restoran Croffle' });
    await restaurantModel.putRestaurant({ id: 4, name: 'Resto Ala-ala' });

    expect(await restaurantModel.searchRestaurant('restoran')).toEqual([
      { id: '1', name: 'Restoran A', favorite: false },
      { id: '2', name: 'Restoran AB', favorite: false },
      { id: '3', name: 'Restoran Croffle', favorite: false },
    ]);
  });
};

export { itActsAsRestaurantModel };
