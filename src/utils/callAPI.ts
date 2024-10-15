type Method = "get" | "post" | "patch" | "put" | "delete";
type Params = {
  headers?: boolean;
};

const callAPI = async <T>(
  baseURL: string,
  endpoint: string,
  method: Method = "get",
  data?: any,
  token?: string,
): Promise<T> => {
  const url = `${baseURL}${endpoint}`;

  const headers: Record<string, string> = {
    accept: "*/*",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  console.log("headers", headers);
  console.log("body", data);
  console.log("url", url);

  const requestOptions: RequestInit = {
    method: method.toUpperCase(),
    headers,
    body: ["post", "patch", "put"].includes(method)
      ? JSON.stringify(data)
      : undefined,
  };

  try {
    const response = await fetch(url, requestOptions);
    console.log("callAPI response raw ===", response);

    const responseData: T = await response.json();
    console.log("callAPI response ===", responseData);

    return responseData;
  } catch (error) {
    console.log("error in callAPI", error, url, JSON.stringify(data));
    throw error;
  }
};

export default callAPI;
