import { Component, Input } from '@angular/core';
import { ModelFile } from '../../services/integration';
import {
  XPIconComponent, IconPack, IconPackApplications, IconPackLonghorn, IconPackWhistler, IconPackXp, IconPackXpSP2
} from 'ngx-xp-icons';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { ByteFormatterPipe } from '../../pipes/byte-formatter.pipe';
import { ExtensionIconFinderService, IconMeta } from '../../services/extension-icon-finder.service';

@Component({
  selector: 'app-file-item',
  standalone: true,
  imports: [
    NgIf,
    XPIconComponent,
    ByteFormatterPipe,
    NgComponentOutlet,
  ],
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.scss',
})
export class FileItemComponent {
  @Input() file!: ModelFile;
  @Input() isRow: boolean = false

  constructor(private readonly iconFinder: ExtensionIconFinderService) {
  }

  get icon(): IconMeta {
    return this.iconFinder.findIcon(this.file)
  }
}
