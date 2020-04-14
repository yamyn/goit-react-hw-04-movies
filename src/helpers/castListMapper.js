export default data =>
    data.cast.map(item => ({
        imageURL:
            item.profile_path === null
                ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
                : `https://image.tmdb.org/t/p/w500${item.profile_path}`,
        name: item.name,
        character: item.character,
        id: item.id,
    }));
