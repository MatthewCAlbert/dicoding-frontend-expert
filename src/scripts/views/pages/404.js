const Page404 = {
  async render() {
    return `
      <app-section center first-no-bg>
        <div class="d-flex flex-column align-items-center text-center">
          <h1 class="mb-0" style="font-size:5rem;">
            404
          </h1>
          <span style="font-weight:bold; font-size: 1.5rem;">Not Found</span>

          <div>
            <p>Lost your way?</p>
            <a href="/#" class="btn btn-primary">Go Back Home</a>
          </div>
        </div>
      </app-section>
    `;
  },
  
  async afterRender() {
    
  },
};

export default Page404;
