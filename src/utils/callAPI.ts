type Method = "get" | "post" | "patch" | "put" | "delete";
type Params = {
  headers?: boolean;
};

type CallAPIResponse<T, P extends Params | undefined> = P extends {
  headers: true;
}
  ? { data: T; headers: Headers }
  : T;

const callAPI = async <T = any, P extends Params | undefined = undefined>(
  baseURL: string,
  endpoint: string,
  method: Method = "get",
  data?: any,
  token?: string,
  params?: P
): Promise<CallAPIResponse<T, P>> => {
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

    if (params?.headers) {
      return {
        data: responseData,
        headers: response.headers,
      } as CallAPIResponse<T, P>;
    }
    return responseData as CallAPIResponse<T, P>;
  } catch (error) {
    console.log("error in callAPI", error, url, JSON.stringify(data));
    throw error;
  }
};

export default callAPI;
