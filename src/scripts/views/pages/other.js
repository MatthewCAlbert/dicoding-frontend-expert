import UrlParser from '../../routes/url-parser';

const OtherPage = {
  async render() {
    return `
      <app-section first-no-bg center>
        <loading-indicator loading></loading-indicator>
        <warning-indicator>Sedih</warning-indicator>
      </app-section>
    `;
  },
  
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
  },
};

export default OtherPage;
