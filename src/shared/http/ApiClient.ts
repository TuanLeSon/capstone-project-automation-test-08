import { APIRequestContext } from '@playwright/test';


export class ApiClient {
constructor(private readonly request: APIRequestContext) {}


async get(path: string, options = {}) {
return this.request.get(path, options);
}


async post(path: string, data: any, options = {}) {
return this.request.post(path, { data, ...options });
}


async put(path: string, data: any) {
return this.request.put(path, { data });
}
}