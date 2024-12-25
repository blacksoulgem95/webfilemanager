import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonFolder, ModelFile } from '../../services/integration';
import { NgForOf, NgIf } from '@angular/common';
import { XpIconNetworkDiskComponent, XpIconNetworkHomeComponent, XpIconStarComponent } from 'ngx-xp-icons';

@Component({
  selector: 'app-main-sidepanel',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    XpIconNetworkHomeComponent,
    XpIconNetworkDiskComponent,
    XpIconStarComponent,
  ],
  templateUrl: './main-sidepanel.component.html',
  styleUrl: './main-sidepanel.component.scss',
})
export class MainSidepanelComponent {
  @Input() commonFolders: CommonFolder[] = [];
  @Input() selectedFolder?: ModelFile;
  @Output() folderSelection: EventEmitter<CommonFolder> = new EventEmitter<CommonFolder>()
}
