const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = '?api_key=168af0fe4d819af69af0e65f181d8d99';

export default {
    API_KEY: '',
    page: 1,
    _query: '',

    updatePage() {
        this.page += 1;
    },

    downgradePage() {
        if (!this.page || this.page === 1) return;
        this.page -= 1;
    },

    resetPage() {
        this.page = 1;
    },

    set currentPage(newPage) {
        this.page = newPage;
    },

    get currentPage() {
        return this.page;
    },

    get query() {
        return this._query;
    },

    set query(newQuery) {
        this._query = newQuery;
    },

    async getPopularMovies() {
        const path = `${baseUrl}movie/popular${apiKey}&language=en-US&page=${this.page}&region=UA`;
        const response = await fetch(path);
        const data = await response.json();
        return data;
    },

    async getMovie(id) {
        const path = `${baseUrl}movie/${id}${apiKey}&language=en-US`;
        const response = await fetch(path);
        const data = await response.json();

        return {
            imageURL:
                data.poster_path === null
                    ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
                    : `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            genres: data.genres
                .map(item => {
                    return item.name.toLowerCase();
                })
                .join(', '),
            title: data.title,
            originalTitle: data.original_title,
            overview: data.overview,
            vote: data.vote_average,
            votes: data.vote_count,
            date:
                data.release_date !== ''
                    ? `(${data.release_date.split('-')[0]})`
                    : '',
            popularity: data.popularity,
            id: data.id,
        };
    },

    async getWatchedMovie(id) {
        const response = await fetch(
            `${baseUrl}movie/${id}${apiKey}&language=en-US`,
        );
        const data = await response.json();
        return {
            imageURL:
                data.poster_path === null
                    ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
                    : `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            title: data.title,
            vote: data.vote_average,
        };
    },

    async getCastList(id) {
        const path = `${baseUrl}movie/${id}/credits${apiKey}&language=en-US`;

        const response = await fetch(path);
        const data = await response.json();
        return data;
    },

    async getReviews(id) {
        const path = `${baseUrl}movie/${id}/reviews${apiKey}&language=en-US`;
        const response = await fetch(path);
        const data = await response.json();
        return data;
    },

    async getSearchedMovie() {
        if (!this._query) {
            return this.getPopularMovies();
        }
        const path = `${baseUrl}search/movie${apiKey}&language=en-US&query=${this._query
            .split(' ')
            .join('+')}&page=${this.page}&region=UA`;
        const response = await fetch(path);
        const data = await response.json();
        return data;
    },
};
