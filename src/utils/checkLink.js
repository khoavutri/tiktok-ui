function checkLink(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export default checkLink;
