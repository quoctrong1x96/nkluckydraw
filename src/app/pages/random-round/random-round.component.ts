import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadDataService } from '../../services/uploadData.service';
import { DataSharingService } from '../../services/sharedData.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-random-round',
  templateUrl: './random-round.component.html',
  styleUrl: './random-round.component.css'
})
export class RandomRoundComponent 
  implements OnInit, OnDestroy {
    private updateInterval: any;
    displayName: string = 'Random Round';
    luckyId: number = 0;
    timeDelay: number = 1; // Thời gian delay mặc định
    rewardId: number = 0;
    isStarted: boolean = false;
    isEnded: boolean = false;
    private stopIntervalTimeout: any;
    isIncreasingDelay: boolean = false; // Trạng thái hiện tại của quá trình tăng thời gian delay
  
    constructor(public excelDataService: UploadDataService,
      private location: Location,
      private dataSharingService: DataSharingService) {}
    

    ngOnInit(): void {
      // Bắt đầu gọi hàm updateExcelData mỗi giây
      // this.updateInterval = setInterval(() => {
      //   this.displayName = this.excelDataService.getRandomName();
      // }, 100);
      this.dataSharingService.data$.subscribe(data => {
        // Sử dụng data trong logic của component nhận dữ liệu
        this.rewardId = data;
      });
    }

    startRandomizing(): void {
      // Bắt đầu gọi hàm updateExcelData với thời gian delay giảm từ 1000 về 10
      this.isStarted = true;
      this.updateInterval = setInterval(() => {
        let human: any;
        human = this.excelDataService.getRandomHuman();
        this.displayName = human.name;
        this.luckyId = human.id;
      }, this.timeDelay);

      // Hẹn giờ để dừng interval sau khoảng 30 giây (30000 milliseconds)
    this.stopIntervalTimeout = setTimeout(() => {
      clearInterval(this.updateInterval);
      this.excelDataService.updateLuckyDrawer(this.luckyId, this.rewardId??0);
      this.isEnded = true;
    }, Math.floor(Math.random() * 8000) + 20000);
    }
    comback():void{
      this.location.back();
    }
    goBack():void{
      this.location.back();
    }

    ngOnDestroy(): void {
      // Đảm bảo dừng interval khi component bị hủy
      clearTimeout(this.stopIntervalTimeout);
    }
  }
