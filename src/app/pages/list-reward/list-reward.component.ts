import { UploadDataService } from '../../_services/uploadData.service';
import { RewardService } from '../../_services/list-reward.service';
import { Reward } from '../../_models/reward';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';

import { Location } from '@angular/common';


import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from '../../_services/sharedData.service';
import { LuckyDrawer } from '../../_models/luckyDrawer';
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
    this.rewards$ = this.service.getAll();
    this.memberReward = this.uploadDataService.getLuckyDrawer();
  }

  countMemberReward(rewardId: string): number {
    let result = 0;
    result= this.memberReward.filter(element => element.reward.id ===rewardId).length;;
    return result;
  }
  checkRewardsLength(): Observable<number> {
    if (this.rewards$) {
      return this.rewards$.pipe(
        map(rewards => rewards.length)
      );
    } else {
      // Trả về một observable với giá trị mặc định (ví dụ: 0) nếu rewards$ là undefined.
      return new Observable<number>(observer => observer.next(0));
    }
  }

  checkMemberReward(rewardId: string): boolean {
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
  getMemebers(rewardId: string): LuckyDrawer[] {
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

  goToManager():void {
    this.router.navigate(['/manager']);
  }
}
