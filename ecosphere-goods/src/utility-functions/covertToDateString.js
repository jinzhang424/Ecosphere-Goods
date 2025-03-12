const convertToDateString = (nanoseconds, seconds) => {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();

    return dateString;
}

export default convertToDateString