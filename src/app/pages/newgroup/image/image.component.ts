import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageService } from './image.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})

export class ImageComponent {

  selectedFile: ImageSnippet;
  todayISOString : string = new Date().toISOString();

  constructor(private imageService: ImageService){}

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    
    const oldName = file.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    const str = oldName.slice(0, oldName.lastIndexOf('.')) + "_" + this.todayISOString.slice(0,19).replace('T', '').replace(':', '').replace(':', '').replace('-', '').replace('-', '');
    
    this.toggle.emit(str + fileExtension);
    
    Object.defineProperty(file, 'name', {
      writable: true,
      value: str + fileExtension
    });

    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      let results = this.imageService.uploadImage(this.selectedFile.file);
      
    });

    reader.readAsDataURL(file);
  }
  
  @Output() toggle = new EventEmitter<string>();

}
