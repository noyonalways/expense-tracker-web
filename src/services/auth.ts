"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const setUserToken = async (token: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set("access_token", token);
};

export const getAccessToken = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get("access_token")?.value;
};

// get current logged in user details
export const getCurrentUser = async () => {
  const accessToken = await getAccessToken();
  let decodedToken = null;

  if (accessToken) {
    decodedToken = jwtDecode(accessToken);
  }

  return decodedToken;
};

// logout user
export const logOutUser = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("access_token");
};
