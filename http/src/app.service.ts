import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<string> {
    // last value from is replacement for deprecated toPromise()
    // custom headers can be injected using AxiosRequestConfig<T> which is second parameter of get<T> method
    const response = await lastValueFrom(
      this.httpService.get<string>('https://catfact.ninja/fact').pipe(
        catchError((error: AxiosError) => {
          console.error(error.message);
          throw error.message;
        }),
      ),
    );
    return response.data;

    //to use interceptors reference for axiosRef needs to be used
    //this.httpService.axiosRef.interceptors.request.use()
  }
}
