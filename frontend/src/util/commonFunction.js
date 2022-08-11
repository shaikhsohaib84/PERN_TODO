export const debounce = (fn, delay) => {
    let timer;
    return function () {
        if (timer) {
            clearInterval(timer)
        }
        let context = this, args = arguments

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

export const getCookie = () => {
    const user = sessionStorage.getItem('user') || ''
    return JSON.parse(user)
}