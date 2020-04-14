export default data =>
    data.results.map(item => ({
        imageURL:
            item.poster_path === null
                ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
                : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        title: item.title,
        vote: item.vote_average,
        date:
            item.release_date !== ''
                ? `(${item.release_date.split('-')[0]})`
                : '',
        id: item.id,
        originalTitle: item.original_title,
    }));
