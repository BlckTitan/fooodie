

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms))
}

export default delay