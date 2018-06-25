import { FileService } from './../../entities/file/file.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[jhi-pro-profile]',
  templateUrl: './pro-profile.component.html',
  styles: []
})
export class ProProfileComponent implements OnInit {

  @Input() currentPro;
  downloadedFile: any;
  
  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() {
    console.log(this.currentPro);
  }

  openFile(filePath, fileName, contentType) {
    this.fileService.getDownloadFile({
      relativeFilePath: filePath
    }).subscribe(
        results => {
          this.downloadedFile = results;
          let arrayTemp = contentType.split('/', 3);
          let fileExtension = arrayTemp[1];
          let downloadFileName = fileName + '_resume.' + fileExtension;

          let url = window.URL.createObjectURL(this.downloadedFile);
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = downloadFileName;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
        }
    );
    
  }

}
