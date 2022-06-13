import axios from 'axios';
const KEY = '27994875-421b8ab33988d310df64bba56';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
  }

  fetchArticles() {
    const params = new URLSearchParams({
      key: KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    return axios.get(`https://pixabay.com/api/?${params}`).then(data => {
      this.page += 1;
      return data;
    });
    // return fetch(
    //   `https://pixabay.com/api/?key=27994875-421b8ab33988d310df64bba56&q=${this.searchQuery}&${params}`
    // )
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(response.statusText);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.page += 1;
    //     console.log(this);
    //     return data;
    //   });
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
