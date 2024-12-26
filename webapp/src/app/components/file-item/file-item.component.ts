import { Component, Input } from '@angular/core';
import { ModelFile } from '../../services/integration';
import {
  IconComponent, IconPack, IconPackApplications, IconPackLonghorn, IconPackWhistler, IconPackXp, IconPackXpSP2
} from 'ngx-xp-icons';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { ByteFormatterPipe } from '../../pipes/byte-formatter.pipe';
import videoExtensions from './video.extensions';
import audioExtensions from './audio.extensions';
import imageExtensions from './image.extensions';
import textExtensions from './text.extensions';
import archiveExtensions from './archive.extensions';
import pdfExtensions from './pdf.extensions';


type IconMeta = {
  name: IconPackXp | IconPackXpSP2 | IconPackLonghorn | IconPackWhistler | IconPackApplications,
  pack: IconPack
}


@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [
    NgIf,
    IconComponent,
    ByteFormatterPipe,
    NgComponentOutlet,
  ],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
})
export class FileItemComponent {
  @Input() file!: ModelFile;

  get icon():IconMeta {
    if (!this.file) {
      return {
        name: "unknown-disc",
        pack: "xp"
      }
    }

    if (this.file.isFolder) {
      return {
        name: "folder-closed",
        pack: "xp"
      }
    }

    const extension = this.file.filename.split('.').pop() || 'UNKNOWN';

    if (videoExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return {
        name: "media-center-file",
        pack: "xp"
      };
    }
    if (audioExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return {
        name: "mp3-player",
        pack: "xp"
      };
    }
    if (imageExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return {
        name: "bitmap",
        pack: "xp"
      }
    }
    if (textExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return {
        name: "generic-text-document",
        pack: "xp"
      };
    }
    if (archiveExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return {
        name: "winrar3",
        pack: "applications"
      };
    }
    if (pdfExtensions.indexOf(extension.toLowerCase()) >= 0) {
      return {
        name: "pdf-file",
        pack: "applications"
      };
    }


    return {
      name: "question",
      pack: "xp"
    };
  }
}
