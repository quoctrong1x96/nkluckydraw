import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize, tap } from 'rxjs/operators';

import * as multer from 'multer';
import * as path from 'path';

import { Reward, REWARDS } from '../_models';

// array in local storage for registered rewards
const rewardsKey:string = 'REWARDS_KEY';
let defaultReward = new BehaviorSubject<Reward[]>(REWARDS);
let rewardFromLocalStore = localStorage.getItem(rewardsKey);
let rewards = rewardFromLocalStore != null ? JSON.parse(rewardFromLocalStore) : [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/rewards') && method === 'GET':
                    return getRewards();
                case url.match(/\/rewards\/\d+$/) && method === 'GET':
                    return getRewardById();
                case url.endsWith('/rewards') && method === 'POST':
                    return createReward();
                case url.match(/\/rewards\/\d+$/) && method === 'PUT':
                    return updateReward();
                case url.match(/\/rewards\/\d+$/) && method === 'DELETE':
                    return deleteReward();
                case url.endsWith('/upload') && method === 'POST':
                        return handleFileUpload(request);
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function getRewards() {
            console.log(rewards);
            return ok(rewards.map((x: Reward) => basicDetails(x)));
        }

        function getRewardById() {
            const reward = rewards.find((x: { id: number; }) => x.id === idFromUrl());
            return ok(basicDetails(reward));
        }

        function createReward() {
            const reward = body;

            if (rewards.find((x: { name: any; }) => x.name === reward.name)) {
                return error(`Reward with name ${reward.name} already exists`);
            }

            // assign reward id and a few other properties then save
            reward.id = newRewardId();
            rewards.push(reward);
            localStorage.setItem(rewardsKey, JSON.stringify(rewards));
            return ok();
        }

        function updateReward() {
            let params = body;
            let reward = rewards.find((x: { id: number; }) => x.id === idFromUrl());

            // only update password if entered
            // if (!params.password) {
            //     delete params.password;
            // }

            // update and save reward
            Object.assign(reward, params);
            localStorage.setItem(rewardsKey, JSON.stringify(rewards));

            return ok();
        }

        function deleteReward() {
            rewards = rewards.filter((x: { id: number; }) => x.id !== idFromUrl());
            localStorage.setItem(rewardsKey, JSON.stringify(rewards));
            return ok();
        }

        // helper functions

        function ok(body?: { id: string; name: string; imageUrl: string; price: number; totalDrawNumber: number; } | undefined) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message:string) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function basicDetails(reward:Reward) {
            const { id, name, imageUrl, price, totalDrawNumber } = reward;
            return { id, name, imageUrl, price, totalDrawNumber };
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function newRewardId() {
            return rewards.length ? Math.max(...rewards.map((x: { id: any; }) => x.id)) + 1 : 1;
        }
        function handleFileUpload(request: HttpRequest<any>): Observable<HttpEvent<any>> {
            const { method, url, body } = request;
            const endpoint = url.split('/');
            const fileName = body.get('image').name;
        
            console.log(`Uploading file ${fileName} to endpoint: /${endpoint[endpoint.length - 1]}`);
        
            // Add logic here to handle file upload (this is just a simple example)
            // You can save the file, update the database, etc.
        
            return of(new HttpResponse({ status: 200, body: { message: 'File uploaded successfully.' } }))
              .pipe(
                tap(() => {
                  // Update your rewards array or perform any other necessary actions
                  console.log(`File ${fileName} uploaded successfully.`);
                })
              );
          }
    }
    
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};