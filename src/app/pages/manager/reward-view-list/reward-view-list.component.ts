
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { RewardService } from '@app/_services';
import { Reward} from '@app/_models';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    templateUrl: 'reward-view-list.component.html',
    styleUrl: 'reward-view-list.component.css'
})
export class RewardViewListComponent implements OnInit {
    rewards:Reward[] = [];

    constructor(private rewardService: RewardService, 
        private location: Location,
        private router: Router) { }

    ngOnInit() {
        this.rewardService.getAll()
            .pipe(first())
            .subscribe(rewards => this.rewards = rewards);
    }

    deleteUser(id: string) {
        const reward = this.rewards.find(x => x.id === id);
        this.rewardService.delete(id)
            .pipe(first())
            .subscribe(() => this.rewards = this.rewards.filter(x => x.id !== id));
    }
    goToAddReward():void {
        this.router.navigate(['/manager/add']);
    };
    goBack():void {
        this.location.back();
    };
}