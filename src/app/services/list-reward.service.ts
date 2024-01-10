import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Reward } from './reward';
import { REWARDS } from './mock-reward';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private reward$: BehaviorSubject<Reward[]> = new BehaviorSubject<Reward[]>(REWARDS);


  getRewards() { return this.reward$; }

  getReward(id: number | string) {
    return this.getRewards().pipe(
      map(reward => reward.find(reward => reward.id === +id)!)
    );
  }
}
