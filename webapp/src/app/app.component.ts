import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenubarComponent } from './components/main-menubar/main-menubar.component';
import { MainSidepanelComponent } from './components/main-sidepanel/main-sidepanel.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import {
  ApiModule,
  CommonFolder,
  FileService,
  SystemService,
  SystemStatus,
} from './services/integration';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainMenubarComponent,
    MainSidepanelComponent,
    ViewerComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'webapp';
  systemStatus?: SystemStatus;
  commonFolders: CommonFolder[] = [];
  isLoading: boolean = false;
  private updateSystemStatusInterval?: number;

  constructor(
    private readonly systemService: SystemService,
    private readonly loadingService: LoadingService,
    private readonly fileService: FileService,
  ) {}

  ngOnDestroy() {
    if (this.updateSystemStatusInterval)
      clearInterval(this.updateSystemStatusInterval);
  }

  ngOnInit() {
    this.loadingService.getSubscription().subscribe({
      next: (isLoading) => {
        this.isLoading = isLoading;
      },
    });

    const loadSystemStatus = () => {
      this.systemService.systemControllerGetSystemStatus().subscribe({
        next: (status) => {
          this.systemStatus = status;
        },
        complete: () => {
          this.updateSystemStatusInterval = setTimeout(loadSystemStatus, 5000);
        },
      });
    };

    this.updateSystemStatusInterval = setTimeout(loadSystemStatus, 5000);

    this.systemService.systemControllerGetCommonFolders().subscribe({
      next: (folders) => {
        this.commonFolders = folders;
      },
    });
  }
}
