import UrlParser from '../../routes/url-parser';

const OtherPage = {
  async render() {
    return `
      <section class="section-first section section-normalized">
        <div class="section-inner">
          <h1>Hello World</h1>
        </div>
      </section>
    `;
  },
  
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
  },
};

export default OtherPage;
