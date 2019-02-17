let filterValue = ''

function getValidIds(item, result) {
    let isValid = false;
    for (var i in item) {
        if (typeof item[i] === 'object') {
            getValidIds(item[i], result);
        } else {
            if (item[i].toString().toLowerCase().includes(filterValue.toString().toLowerCase())) {
                result.id = item.id;
                isValid = true;
            }
        }
    }
    if (isValid) {
        return item;
    }
    return result
}

function filterObj(obj, filterStr) {
    filterValue = filterStr
    let validIds = new Set();
    let filteredArr = []
    validIds = [...obj.map(item => getValidIds(item, {}))];
    validIds.map(item => {
        obj.map(i => item.id === i.id ? filteredArr.push(i) : null)
    })
    return filteredArr
}

export default filterObj;