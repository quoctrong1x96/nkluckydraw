import { UploadDataService } from './../../services/uploadData.service';
import { RewardService } from '../../services/list-reward.service';
import { Reward } from '../../services/reward';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';

import { Location } from '@angular/common';


import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from '../../services/sharedData.service';
import { LuckyDrawer } from '../../services/luckyDrawer';
@Component({
  selector: 'list-reward',
  templateUrl: './list-reward.component.html',
  styleUrls: ['./list-reward.component.css']
})
export class ListRewardComponent implements OnInit {
  rewards$?: Observable<Reward[]>;
  memberReward: LuckyDrawer[] = [];
  selectedId = 0;

  constructor(
    private service: RewardService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    private uploadDataService: UploadDataService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.rewards$ = this.service.getRewards();
    this.memberReward = this.uploadDataService.getLuckyDrawer();
  }

  countMemberReward(rewardId: number): number {
    let result = 0;
    result= this.memberReward.filter(element => element.reward.id ===rewardId).length;;
    return result;
  }

  checkMemberReward(rewardId: number): boolean {
    let result = false;
    console.log(this.memberReward);
    this.memberReward.forEach(element => {
      console.log(element);
      if (element.reward.id === rewardId) {
        result = true;
      }
    });
    return result;
  }
  getMemebers(rewardId: number): LuckyDrawer[] {
    return this.memberReward.filter(element => element.reward.id ===rewardId);
    
  }

  onClickRewards(reward: any) {
    if (reward.totalDrawNumber !== this.countMemberReward(reward.id)) {
      this.dataSharingService.sendData(reward.id);
      this.router.navigate(['/random-round']);
      reward.drewCount++;
    } else {
      this.openSnackBar("ĐÃ QUAY HẾT LƯỢT!!!")
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-container']
    });
  }
  formatNumber(number: number): string {
    return number.toLocaleString('en-US');
  }

  goBack(): void {
    this.location.back();
  }
}
