import { IVendor } from "../types/vendor.types";
import callAPI from "../utils/callAPI";
import { BASE_URL } from "../utils/constants";

export const getImageUrl = async (
  body: FormData
): Promise<{ imageUrl?: string; success?: boolean }> => {
  const response = await fetch("http://13.200.54.218/api/v1/upload", {
    method: "POST",
    body,
  });
  return await response.json();
};

export const sendOtp = (body: { phoneNumber: string }) => {
  return callAPI<{ status?: "success" }>(
    BASE_URL,
    "/api/v1/auth/send-otp/vendor",
    "post",
    body
  );
};
export const verifyOtp = (body: { phoneNumber: string; otp: string }) => {
  return callAPI<{ token?: string; message?: string }>(
    BASE_URL,
    "/api/v1/auth/verify-otp/vendor",
    "post",
    body
  );
};
export const getVendorDetails = (token: string) => {
  return callAPI<IVendor>(BASE_URL, "/api/v1/vendor/me", "get", null, token);
};
export const updateVendorDetails = (userId: string, body: Partial<IVendor>) => {
  return callAPI<IVendor>(BASE_URL, "/api/v1/vendor/" + userId, "put", body);
};
