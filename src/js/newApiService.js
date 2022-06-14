import axios from 'axios';
const KEY = '27994875-421b8ab33988d310df64bba56';
//  axios.defaults.params={}
export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
  }

  async fetchArticles() {
    const params = new URLSearchParams({
      key: KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });
    const data = await axios.get(`https://pixabay.com/api/?${params}`);
    this.page += 1;
    return data;
  }

  changePage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQary) {
    this.searchQuery = newQary;
  }
  set totalHids(namber) {
    this.hits = namber;
  }

  changeHids() {
    this.hits -= 40;
  }
}
