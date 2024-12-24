import { Component, Input } from '@angular/core';
import { CommonFolder } from '../../services/integration';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-main-sidepanel',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './main-sidepanel.component.html',
  styleUrl: './main-sidepanel.component.scss',
})
export class MainSidepanelComponent {
  @Input() commonFolders: CommonFolder[] = [];
}
