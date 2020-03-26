import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileService } from './file.service';

class FileSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})

export class FileComponent {

  @Input() repo_id: number;
  
  selectedFile: FileSnippet;
  todayISOString : string = new Date().toISOString();
  str = "";

  constructor(private fileService: FileService){}

  async processFile(fileInput: any, repo_id: number) {
    
    const file: File = fileInput.files[0];
    const oldName = file.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    this.str = oldName.slice(0, oldName.lastIndexOf('.'));

    if (repo_id == null){
      repo_id = 99999;
      this.str = oldName.slice(0, oldName.lastIndexOf('.')) + "_" + this.todayISOString.slice(0,19).replace('T', '').replace(':', '').replace(':', '').replace('-', '').replace('-', '');
    } 

    this.toggle.emit(this.str + fileExtension);
    
    Object.defineProperty(file, 'name', {
      writable: true,
      value: this.str + fileExtension
    });

    const reader = new FileReader();
    reader.addEventListener('load', async (event: any) => {

      this.selectedFile = new FileSnippet(event.target.result, file);
      const results = await this.fileService.uploadFile(this.selectedFile.file, repo_id);
      this.toggle.emit(results);
    
    });

    reader.readAsDataURL(file);
  }
  
  @Output() toggle = new EventEmitter<string>();

}
