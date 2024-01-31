import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Reward } from '../_models/reward';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/rewards`;
@Injectable({
  providedIn: 'root',
})

export class RewardService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Reward[]>(baseUrl);
    }

    getById(id: number| string) {
        return this.http.get<Reward>(`${baseUrl}/${id}`);
    }

    create(params:any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params:any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}

