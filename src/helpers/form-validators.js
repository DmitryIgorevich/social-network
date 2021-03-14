export let required = (value) => {
    if (value) {
        return undefined;
    }
    return 'Поле обязательно к заполнению'
}
export let email = (value) => {
    let res = value.match(/@[\w\d]+\.[\w]+/);
    if (!res) {
        return 'Неправильная форма email'
    }
    if (res[0]) {
        return undefined;
    }
}
export let isUrlAdress = (value) => {
    if (!value) return undefined;
    let result = value.match(/[\w\W\d\D]+\.[\w\W]+/);
    if (result) return undefined;
    return 'Неверный формат URL адреса';
}
// 
export let maxLengthCreator = (maxLength) => (value) => {
    if (!value || value.length < maxLength) {
        return undefined;
    }
    return `Максимальное количество символов ${maxLength}`;
}
export let maxLength100 = maxLengthCreator(10);