import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonFolder, ModelFile } from '../../services/integration';
import { NgForOf, NgIf } from '@angular/common';
import {
  XPIconComponent,
  IconPack, IconNames
} from 'ngx-xp-icons';

@Component({
  selector: 'app-main-sidepanel',
  standalone: true,
  imports: [NgForOf, NgIf, XPIconComponent],
  templateUrl: './main-sidepanel.component.html',
  styleUrl: './main-sidepanel.component.scss',
})
export class MainSidepanelComponent {
  @Input() commonFolders: CommonFolder[] = [];
  @Input() selectedFolder?: ModelFile;
  @Output() folderSelection: EventEmitter<CommonFolder> =
    new EventEmitter<CommonFolder>();

  getIconName(item: CommonFolder): IconNames {
    switch (item.icon) {
      case 'home':
        return 'my-documents';
      case 'root':
        return 'local-disk';
      default:
        return 'question';
    }
  }

  getIconPack(item: CommonFolder): IconPack {
    switch (item.icon) {
      case 'home':
      case 'root':
        return 'xp';
      default:
        return 'xp';
    }
  }
}
