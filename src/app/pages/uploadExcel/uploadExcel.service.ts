// excel-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadExcelService {
  private excelData: any[] = [];
  private excelHeader: any[] = [];

  uploadExcelData(data: any[]): void {
    // Save the uploaded data
    this.excelData = data;
  }
  uploadExcelHeader(data: any[]): void {
    // Save header information
    this.excelHeader = data;
  }

  getExcelData(): any[] {
    // Return the current data
    return this.excelData;
  }

  getExcelHeader(): any[] {
    // Return the current data
    return this.excelHeader;
  }
}


