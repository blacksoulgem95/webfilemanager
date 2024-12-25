import { Component, Input } from '@angular/core';
import { ModelFile } from '../../services/integration';
import {
  XpIconAudioFileComponent,
  XpIconFolderComponent, XpIconImageFileComponent, XpIconTextFileComponent,
  XpIconUnknownFileComponent,
  XpIconVideoFileComponent, XpIconWinrarComponent
} from 'ngx-xp-icons';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { ByteFormatterPipe } from '../../pipes/byte-formatter.pipe';
import videoExtensions from './video.extensions';
import audioExtensions from './audio.extensions';
import imageExtensions from './image.extensions';
import textExtensions from './text.extensions';
import archiveExtensions from './archive.extensions';

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [
    XpIconFolderComponent,
    NgIf,
    XpIconUnknownFileComponent,
    XpIconVideoFileComponent,
    XpIconAudioFileComponent,
    XpIconImageFileComponent,
    XpIconTextFileComponent,
    XpIconWinrarComponent,
    ByteFormatterPipe,
    NgComponentOutlet,
  ],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
})
export class FileItemComponent {
  @Input() file!: ModelFile;

  get icon() {
    if (!this.file) {
      return XpIconUnknownFileComponent
    }

    if (this.file.isFolder) {
      return XpIconFolderComponent;
    }

    const extension = this.file.filename.split('.').pop() || 'UNKNOWN';

    if (videoExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return XpIconVideoFileComponent;
    }
    if (audioExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return XpIconAudioFileComponent;
    }
    if (imageExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return XpIconImageFileComponent;
    }
    if (textExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return XpIconTextFileComponent;
    }
    if (archiveExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return XpIconWinrarComponent;
    }

    return XpIconUnknownFileComponent;
  }
}
