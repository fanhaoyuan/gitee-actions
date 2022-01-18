import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpService {
    private _getDefaultConfig(): AxiosRequestConfig {
        return {
            baseURL: 'https://gitee.com/api/v5/',
        };
    }

    private _injectRequestInterceptor(instance: AxiosInstance) {
        instance.interceptors.request.use(
            config => config,
            error => Promise.reject(error)
        );
    }

    private _injectResponseInterceptor(instance: AxiosInstance) {
        instance.interceptors.response.use(
            res => Promise.resolve(res),
            error => Promise.reject(error)
        );
    }

    request(patchConfig: AxiosRequestConfig) {
        const instance = axios.create(this._getDefaultConfig());

        this._injectRequestInterceptor(instance);
        this._injectResponseInterceptor(instance);

        return instance.request(patchConfig);
    }
}
