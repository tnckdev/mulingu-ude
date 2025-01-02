import axios from "axios";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type ProvidersResponse = {
  [key: string]: Provider;
};

type CSRFResponse = {
  csrfToken: string;
};

const fetchProviders = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/providers`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchCSRFToken = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/csrf`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchSession = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/session`,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchProviders, fetchCSRFToken, fetchSession };
export type { Provider, ProvidersResponse, CSRFResponse };
