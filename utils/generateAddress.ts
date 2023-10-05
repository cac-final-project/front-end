export const generateSentence = (entry: any) => {
    const road = entry.road || '';
    const postcode = entry.postcode || '';

    // Preferred keys to control the insertion of available attributes.
    const preferredKeys = ['house_number', 'neighbourhood', 'leisure'];

    const additionalInfo = preferredKeys
        .map((key) => entry[key]) // Map to the actual values using the keys
        .filter(Boolean) // Filter out undefined or missing values
        .join(', '); // Join the remaining values using comma

    return `${road} ${
        additionalInfo ? `(${additionalInfo})` : ''
    } ${postcode}`.trim();
};
