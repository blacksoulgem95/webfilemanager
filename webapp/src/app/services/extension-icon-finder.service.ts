import { Injectable } from '@angular/core';
import { ModelFile } from './integration';
import { IconNames, IconPack } from 'ngx-xp-icons';
import {
  msAccessExtensions,
  msExcelExtensions, msOneNoteExtensions, msOutlookExtensions,
  msPowerpointExtensions, msProjectExtensions, msPublisherExtensions, msVisioExtension,
  msWordExtensions, photoshopExtensions, xmlExtensions
} from './icon-finder/office.extensions';
import {
  configExtensions, diskImageExtensions, fontExtensions,
  installerExtensions, javaExtensions,
  runnableExtensions,
  shellExtensions, systemLibraryExtensions
} from './icon-finder/os.extensions';
import pdfExtensions from './icon-finder/pdf.extensions';
import archiveExtensions from './icon-finder/archive.extensions';
import textExtensions from './icon-finder/text.extensions';
import imageExtensions from './icon-finder/image.extensions';
import audioExtensions from './icon-finder/audio.extensions';
import videoExtensions from './icon-finder/video.extensions';

export type IconMeta = {
  name: IconNames;
  pack: IconPack;
};

@Injectable({
  providedIn: 'root',
})
export class ExtensionIconFinderService {
  constructor() {}

  findIcon(file: ModelFile): IconMeta {
    if (!file) {
      return {
        name: 'question',
        pack: 'xp',
      };
    }

    if (file.isFolder) {
      return {
        name: 'folder-closed',
        pack: 'xp',
      };
    }

    const extension = (file.filename.split('.').pop() || 'UNKNOWN').toLowerCase();

    if (videoExtensions.indexOf(extension) >= 0) {
      return {
        name: 'generic-video',
        pack: 'xp',
      };
    }
    if (audioExtensions.indexOf(extension) >= 0) {
      return {
        name: 'generic-audio',
        pack: 'xp',
      };
    }

    if (['jpg'].indexOf(extension) >= 0) {
      return {
        name: 'jpg',
        pack: 'xp',
      };
    }

    if (['gif'].indexOf(extension) >= 0) {
      return {
        name: 'gif',
        pack: 'xp',
      };
    }

    if (imageExtensions.indexOf(extension) >= 0) {
      return {
        name: 'jpg',
        pack: 'xp',
      };
    }
    if (textExtensions.indexOf(extension) >= 0) {
      return {
        name: 'txt',
        pack: 'xp',
      };
    }
    if (archiveExtensions.indexOf(extension) >= 0) {
      return {
        name: 'winrar3',
        pack: 'applications',
      };
    }
    if (pdfExtensions.indexOf(extension) >= 0) {
      return {
        name: 'pdf-file',
        pack: 'applications',
      };
    }
    if (runnableExtensions.indexOf(extension) >= 0) {
      return {
        name: 'programs',
        pack: 'xp',
      };
    }
    if (installerExtensions.indexOf(extension) >= 0) {
      return {
        name: 'programs',
        pack: 'xp',
      };
    }
    if (configExtensions.indexOf(extension) >= 0) {
      return {
        name: 'inf',
        pack: 'xp',
      };
    }
    if (systemLibraryExtensions.indexOf(extension) >= 0) {
      return {
        name: 'dll',
        pack: 'xp',
      };
    }
    if (shellExtensions.indexOf(extension) >= 0) {
      return {
        name: 'command-prompt',
        pack: 'xp',
      };
    }
    if (diskImageExtensions.indexOf(extension) >= 0) {
      return {
        name: 'dvd',
        pack: 'xp',
      };
    }
    if (javaExtensions.indexOf(extension) >= 0) {
      return {
        name: 'java',
        pack: 'w95',
      };
    }
    if (xmlExtensions.indexOf(extension) >= 0) {
      return {
        name: 'xml',
        pack: 'xp',
      };
    }
    if (msExcelExtensions.indexOf(extension) >= 0) {
      return {
        name: 'excel',
        pack: 'office2003',
      };
    }
    if (msPowerpointExtensions.indexOf(extension) >= 0) {
      return {
        name: 'power-point',
        pack: 'office2003',
      };
    }
    if (['rtf'].indexOf(extension) >= 0) {
      return {
        name: 'rtf',
        pack: 'xp',
      };
    }
    if (msWordExtensions.indexOf(extension) >= 0) {
      return {
        name: 'word',
        pack: 'office2003',
      };
    }
    if (msAccessExtensions.indexOf(extension) >= 0) {
      return {
        name: 'access',
        pack: 'office2003',
      };
    }
    if (msOutlookExtensions.indexOf(extension) >= 0) {
      return {
        name: 'outlook',
        pack: 'office2003',
      };
    }
    if (msOneNoteExtensions.indexOf(extension) >= 0) {
      return {
        name: 'one-note',
        pack: 'office2003',
      };
    }
    if (msPublisherExtensions.indexOf(extension) >= 0) {
      return {
        name: 'publisher',
        pack: 'office2003',
      };
    }
    if (msVisioExtension.indexOf(extension) >= 0) {
      return {
        name: 'visio',
        pack: 'office2003',
      };
    }
    if (msProjectExtensions.indexOf(extension) >= 0) {
      return {
        name: 'project',
        pack: 'office2003',
      };
    }
    if (photoshopExtensions.indexOf(extension) >= 0) {
      return {
        name: 'picture-manager',
        pack: 'office2003',
      };
    }
    if (fontExtensions.indexOf(extension) >= 0) {
      return {
        name: 'true-type',
        pack: 'xp',
      };
    }

    return {
      name: 'default',
      pack: 'xp',
    };
  }
}
