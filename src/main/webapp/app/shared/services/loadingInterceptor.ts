import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { LoadingService } from './loader.service';

@Injectable()
export class loadingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoadingService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    let timer = Observable.timer(1000);
    timer.subscribe(t => {
      this.loaderService.isLoading.next(this.requests.length > 0);
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
