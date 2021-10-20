module.exports = {
    findAsync: async (arr, asyncCallback) => {
        const promises = arr.map(asyncCallback);
        const dataList = await Promise.all(promises);
        return dataList.find((data) => data);
    }
}