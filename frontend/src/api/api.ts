import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { IUser } from "../types/user";

class HttpClient {
  protected instance: AxiosInstance;
  private authToken: string | null;

  public constructor(BaseURL: string) {
    this.authToken = localStorage.getItem("key");
    if (this.authToken)
      this.instance = axios.create({
        baseURL: BaseURL,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
    else
      this.instance = axios.create({
        baseURL: BaseURL,
        withCredentials: true,
      });

    this._initializeResponseInterceptor();
  }

  protected _handleError = (error: AxiosError) => {
    if (error.status === 401) {
      localStorage.removeItem("key");
      window.location.reload();
    }
    return Promise.reject(error);
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  private _handleResponse = (res: AxiosResponse) => res;
}

export class Api extends HttpClient {
  constructor() {
    super(process.env.REACT_APP_BASEURL || `http://127.0.0.1:3005/`);
    console.log(process.env.REACT_APP_BASEURL, "process.env.REACT_APP_BASEURL");
  }

  async getMe() {
    return this.instance.get<IUser>("/auth/profile");
  }

  async login(payload: Pick<IUser, "username" | "password">) {
    return this.instance.post("/auth/login", payload);
  }

  async resetPassword(password: string) {
    return this.instance.patch("/user/reset", { password });
  }

  async register(payload: Pick<IUser, "username" | "password">) {
    return this.instance.post("/user", payload);
  }
}
