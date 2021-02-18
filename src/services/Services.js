const getResource = async () => {
    let response = await fetch('http://demo1030918.mockable.io/')
    let commit = await response.json()
    return commit
}

export { getResource };