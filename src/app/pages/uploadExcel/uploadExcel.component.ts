import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {UploadDataService} from '../../services/uploadData.service';
import { LuckyDrawer } from '../../services/luckyDrawer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'upload-excel',
  templateUrl: './uploadExcel.component.html',
  styleUrls: ['./uploadExcel.component.css']
})
export class UploadExcelComponent{
  excelData: any[] = [];
  headers: string[] = [];
  luckyDrawer: LuckyDrawer[] = [];
  constructor(private uploadDataService: UploadDataService,
    private router: Router
    ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.excelData = this.uploadDataService.getData();
    this.headers = this.uploadDataService.getHeader();
    this.luckyDrawer = this.uploadDataService.getLuckyDrawer();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readExcel(file);
    }
  }

  readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to JSON
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      // Handle the Excel data, e.g., update a table
      this.uploadDataService.uploadData(this.excelData, Object.keys(this.excelData[0]));
      this.headers = this.uploadDataService.getHeader();
      this.luckyDrawer =[];
    };
    reader.readAsBinaryString(file);
  }

  updateTable(data: any[]): void {
    // Implement logic to update your table with the Excel data
    
  }

  shuffleData(event:any):void{
    this.uploadDataService.shuffleData();
  }

  reset():void {
    this.uploadDataService.resetLuckyDrawer();
  }

  goToRewardList():void {
    this.router.navigate(['/list-reward']);
  }

}
