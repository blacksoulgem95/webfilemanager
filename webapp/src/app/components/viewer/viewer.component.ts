import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonFolder, ModelFile } from '../../services/integration';
import { NgForOf, NgIf } from '@angular/common';
import { FileItemComponent } from '../file-item/file-item.component';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [NgIf, FileItemComponent, NgForOf],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent {
  @Input() selectedItem?: ModelFile;
  @Output() itemSelection: EventEmitter<ModelFile> =
    new EventEmitter<ModelFile>();

  activeItem?: ModelFile;
  doubleClickInitiated: boolean = false;

  get items(): ModelFile[] {
    return this.selectedItem?.content.sort((a:ModelFile, b:ModelFile) => {
      if (a.isFolder && b.isFolder) return 0
      if (a.isFolder && !b.isFolder) return -1
      if (!a.isFolder && b.isFolder) return 1

      const extA = a.filename.includes('.') ? a.filename.split('.').pop()?.toLowerCase() || '' : '';
      const extB = b.filename.includes('.') ? b.filename.split('.').pop()?.toLowerCase() || '' : '';

      if (extA < extB) return -1;
      if (extA > extB) return 1;

      return a.filename.localeCompare(b.filename);
    }) || []
  }

  clickItem(item?: ModelFile) {
    console.log("click", item)
    if (item && !this.doubleClickInitiated) {
      console.log('selected', item)
      this.activeItem = item
      this.doubleClickInitiated = true
      setTimeout(() => this.doubleClickInitiated = false, 250)
    } else if (item && this.activeItem != item) {
      console.log('selected', item)
      this.activeItem = item
      this.doubleClickInitiated = true
      setTimeout(() => this.doubleClickInitiated = false, 250)
    } else if (item) {
      console.log('opening', item)
      this.itemSelection.next(item)
    } else {
      this.doubleClickInitiated = false;
    }
  }
}
