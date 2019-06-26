const sortResult = () => {
    let sortable = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        sortable.push([key, value]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    return sortable;
}

const getResult = () => {
    let ol = document.createElement('ol');
    let sortableResult = sortResult();

    sortableResult.forEach(element => {
        let li = document.createElement('li');
        li.textContent = `${element[0]}: ${element[1]}`;
        ol.appendChild(li);
    });

    document.querySelector('.modal-content').appendChild(ol);
}

export default getResult;