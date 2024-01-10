// excel-data.service.ts
import { Injectable } from '@angular/core';
import { RewardService } from './list-reward.service';
import { LuckyDrawer } from './luckyDrawer';
import { Reward } from './reward';
import { Observable } from 'rxjs';

const STORAGE_KEY_DATA = 'excelData';
const STORAGE_KEY_HEADER = 'excelHeaders';
const STORAGE_KEY_LUCKYDRAWER = 'luckyDrawer';

@Injectable({
  providedIn: 'root',
})
export class UploadDataService {
  private excelData: any[] = [];
  private excelHeader: any[] = [];
  private luckyDrawer: LuckyDrawer[];

  constructor(private service: RewardService) {
    // Load data from local storage when the service is created
    const storedData = localStorage.getItem(STORAGE_KEY_DATA);
    const storeHeader = localStorage.getItem(STORAGE_KEY_HEADER);
    const storedLuckyDrawer = localStorage.getItem(STORAGE_KEY_LUCKYDRAWER);

    this.excelData = storedData ? JSON.parse(storedData) : [];
    this.excelHeader = storeHeader ? JSON.parse(storeHeader) : [];
    this.luckyDrawer = storedLuckyDrawer ? JSON.parse(storedLuckyDrawer) : [];
  }

  uploadData(data: any[], header: any[]): void {
    // Save the uploaded data
    this.excelData = data;
    this.excelHeader = header;
    this.luckyDrawer = [];

    // Save data to local storage
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEY_HEADER, JSON.stringify(header));
    localStorage.setItem(STORAGE_KEY_LUCKYDRAWER, JSON.stringify([]));
  }

  getRandomHuman(): any {
    let human:any = {name: '', id : 0};
    const randomNumber = Math.floor(Math.random() * this.excelData.length) + 1;
    human.name = this.excelData[randomNumber]["Tên"];
    human.id = this.excelData[randomNumber]["STT"];
    return human;
  }

  getData(): any[] {
    // Return the current data
    return this.excelData;
  }

  getHeader(): any[] {
    // Return the current data
    return this.excelHeader;
  }

  getLuckyDrawer(): any[] {
    return this.luckyDrawer;
  }

  updateLuckyDrawer(luckier: number, rewardId: number): void {
    console.log(luckier, rewardId);
    this.service.getReward(rewardId).subscribe(reward => {
      let newLuckyDrawer: LuckyDrawer = { id: 0, reward: reward, name: '' };
      let dataExcel = this.excelData.find(excel => excel["STT"] == luckier );
      newLuckyDrawer.id = dataExcel["STT"];
      newLuckyDrawer.name = dataExcel["Tên"];
      newLuckyDrawer.reward = reward;
      console.log(reward);
      this.luckyDrawer.push(newLuckyDrawer);
      localStorage.setItem(STORAGE_KEY_LUCKYDRAWER, JSON.stringify(this.luckyDrawer));
      // Use the fil.reduce(function method to create a new array without the item with the specified id
      
      this.excelData = this.excelData.filter(item => item["STT"] !== luckier);
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(this.excelData));
    });
  }

  resetLuckyDrawer(): void {
    this.luckyDrawer = []
  }

  // Hàm xáo trộn mảng
  shuffleData() {
    for (let i = this.excelData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.excelData[i], this.excelData[j]] = [this.excelData[j], this.excelData[i]];
    }
  }
}
