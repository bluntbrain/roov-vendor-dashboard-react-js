import moment from "moment";

export const navigate = (url: string = "") => {
  window.location.href = "/" + url;
};
export const splitName = (fullName: string) => {
  // Ensure the input is a string and handle edge cases like empty strings
  const nameArray = String(fullName)
    .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
    .trim() // Trim leading and trailing spaces
    .split(" "); // Split by spaces

  const namePartsCount = nameArray.length;

  if (namePartsCount === 0 || nameArray[0] === "") {
    // Return an empty object if no valid name parts
    return {};
  } else if (namePartsCount === 1) {
    // Only one part, assume it's the first name
    return { firstName: nameArray[0] };
  } else if (namePartsCount === 2) {
    // Two parts, assume first is first name and second is last name
    return { firstName: nameArray[0], lastName: nameArray[1] };
  } else if (namePartsCount === 3) {
    // Three parts, assume first is first name, middle is middle name, last is last name
    return {
      firstName: nameArray[0],
      middleName: nameArray[1],
      lastName: nameArray[2],
    };
  } else {
    // More than three parts, combine remaining parts into the last name
    return {
      firstName: nameArray[0],
      middleName: nameArray.slice(1, namePartsCount - 1).join(" "), // Combine middle parts
      lastName: nameArray[namePartsCount - 1],
    };
  }
};

export const formatDateTime = (isoString?: string) => {
  if (!isoString) return "";
  return moment(isoString).format("DD MMM, h:mm a");
};
