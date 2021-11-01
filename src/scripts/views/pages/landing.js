const LandingPage = {
  async render() {
    return `
      <section class="section section-first section-normalized homepage-hero" id="hero">
        <lazy-image no-lazy force-resize class="homepage-hero-image" data-src="/images/bg-hero.jpg" alt="hero image"></lazy-image>
        <div class="section-inner w-100">
          <p class="text-center text-white hero-title">Find your next place to eat</p>
          <div class="homepage-hero-searchbar">
              <input class="form-control me-3" type="text" placeholder="Find your restaurant here.." />
              <div>
                  <div class="homepage-hero-searchbar-city-container">
                    <select class="homepage-hero-searchbar-city-selector form-control me-3">
                      <option value="">All Location</option>
                    </select>
                  </div>
                  <button aria-label="Search Button" class="btn homepage-hero-searchbar-button">
                      <i class="fas fa-search"></i>
                  </button>
              </div>
          </div>

          <div class="hero-explore-now">
            <p>Don’t know what or where to eat?</p>
            <a href="#explore" class="btn">Explore Now <i class="fas fa-chevron-down"></i></a>
          </div>
        </div>
      </section>

      <app-section class="explore-section" id="explore">
        <h1 class="text-center mb-0">Explore Restaurant</h1>
        <restaurant-container><restaurant-container/>
      </app-section>
    `;
  },

  async afterRender() {
  },
};

export default LandingPage;
