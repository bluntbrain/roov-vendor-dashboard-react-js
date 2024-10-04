import { saveAs } from 'file-saver';

export const getInitial = (name: string = "") => {
  return name[0];
};

export const navigate = (url: string = "") => {
  window.location.href = "/" + url;
};

export function formatDate(dateString: string): string {
  // Create a new Date object from the provided string
  const date = new Date(dateString);

  // Extract the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Extract the time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPM = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // If hours are 0, convert to 12

  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${amPM}`;

  return formattedDate;
}

export const formatTime = (timestamp?: string | number): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

type AnyObject = { [key: string]: any };

const COLUMN_ORDER = [
  "ecode",
  "name",
  "grade",
  "reportingManager.ecode",
  "reportingManager.name",
  "designation",
  "division",
  "business.businessCode",
  "business.businessName",
  "department.departmentCode",
  "department.departmentName",
  "subDepartment",
  "location",
  "type"
];

const COLUMN_DISPLAY_NAMES:{
  [key: string]: string;
} = {
  "ecode": "SGID",
  "name": "Name",
  "grade": "Grade",
  "reportingManager.ecode": "Manager code",
  "reportingManager.name": "Reporting Manager",
  "designation": "Designation",
  "division": "Division",
  "business.businessCode": "Business Code",
  "business.businessName": "Business",
  "department.departmentCode": "Business Function ID",
  "department.departmentName": "Business Function",
  "subDepartment": "Department",
  "location": "Location",
  "type": "Type"
};

export const flattenObject = (obj: AnyObject, prefix = ''): AnyObject =>
  Object.keys(obj).reduce((acc: AnyObject, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});

export const convertToCSV = (data: AnyObject[]): string => {
  if (data.length === 0) return '';

  const flattenedData = data.map(item => flattenObject(item));
  const headers = COLUMN_ORDER.map(key => COLUMN_DISPLAY_NAMES[key]);
  const csvRows = [
    headers.join(','), 
    ...flattenedData.map(row => COLUMN_ORDER.map(header => {
      let value = row[header] || '';
      // Remove commas from location field
      if (header === 'location') {
        value = value.replace(/,/g, '');
      }
      return value;
    }).join(',')) 
  ];
  return csvRows.join('\n');
};

export const downloadCSV = (data: AnyObject[], fileName: string, ) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, fileName);
};

const ACTIVITY_COLUMN_ORDER = [
  "timestamp",
  "type",
  "message",
];

const ACTIVITY_COLUMN_DISPLAY_NAMES:{
  [key: string]: string;
} = {
  "timestamp": "Timestamp",
  "type": "Type",
  "message": "Message",
};

export const convertActivityToCSV = (data: AnyObject[]): string => {
  if (data.length === 0) return '';

  const headers = ACTIVITY_COLUMN_ORDER.map(key => ACTIVITY_COLUMN_DISPLAY_NAMES[key]);
  const csvRows = [
    headers.join(','), 
    ...data.map(row => ACTIVITY_COLUMN_ORDER.map(header => {
      let value = row[header] || '';
      if (header === 'timestamp') {
        value = new Date(value).toLocaleString();
        value = value.replace(/,/g, '');
      }
      return value;
    }).join(',')) // data rows
  ];
  return csvRows.join('\n');
};

export const downloadActivityCSV = (data: AnyObject[], fileName: string) => {
  const csvData = convertActivityToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, fileName);
};

export const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};