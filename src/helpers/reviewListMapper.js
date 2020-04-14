export default data =>
    data.results.map(item => ({
        content: item.content,
        author: item.author,
        id: item.id,
    }));
