import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonFolder, ModelFile } from '../../services/integration';
import { NgForOf, NgIf } from '@angular/common';
import {
  IconComponent,
  IconPack, IconPackApplications, IconPackLonghorn, IconPackWhistler,
  IconPackXp, IconPackXpSP2
} from 'ngx-xp-icons';

@Component({
  selector: 'app-main-sidepanel',
  standalone: true,
  imports: [NgForOf, NgIf, IconComponent],
  templateUrl: './main-sidepanel.component.html',
  styleUrl: './main-sidepanel.component.scss',
})
export class MainSidepanelComponent {
  @Input() commonFolders: CommonFolder[] = [];
  @Input() selectedFolder?: ModelFile;
  @Output() folderSelection: EventEmitter<CommonFolder> =
    new EventEmitter<CommonFolder>();

  getIconName(item: CommonFolder): IconPackXp | IconPackXpSP2 | IconPackLonghorn | IconPackWhistler | IconPackApplications {
    switch (item.icon) {
      case 'home':
        return ((): IconPackXp => 'my-documents')();
      case 'root':
        return ((): IconPackXp => 'local-disk')();
      default:
        return ((): IconPackXp => 'question')();
    }
  }

  getIconPack(item: CommonFolder): IconPack {
    switch (item.icon) {
      case 'home':
        return ((): IconPack => 'xp')();
      case 'root':
        return ((): IconPack => 'xp')();
      default:
        return ((): IconPack => 'xp')();
    }
  }
}
