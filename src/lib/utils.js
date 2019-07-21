export const getCompressUrl = ({ url, url: { length: urlLength }, length = 100 }) => {
    if (urlLength <= length) return url;
    const firstSub = parseInt((length - 3) / 2),
        end = urlLength - (length - (firstSub + 3));
    return `${url.substring(0, firstSub)}...${url.substring(end)}`;
};
