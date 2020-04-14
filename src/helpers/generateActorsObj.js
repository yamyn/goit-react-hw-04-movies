import castListMapper from './castListMapper';

export default data => {
    const actorsObj = {};
    const arr = castListMapper(data);
    arr.reduce((acc, obj, i) => {
        if (!(i % 5)) {
            acc += 1;
            actorsObj[`${acc}`] = [];
            actorsObj.pageCount = acc;
            actorsObj.length = arr.length;
        }
        actorsObj[`${acc}`].push(obj);
        return acc;
    }, 0);
    return actorsObj;
};
