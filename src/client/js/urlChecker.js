
function checkForURL(inputURL) {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(inputURL);
}

export { checkForURL };
