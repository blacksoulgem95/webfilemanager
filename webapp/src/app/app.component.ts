import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MainMenubarComponent } from './components/main-menubar/main-menubar.component';
import { MainSidepanelComponent } from './components/main-sidepanel/main-sidepanel.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import {
  CommonFolder,
  FileService,
  ModelFile,
  SystemService,
  SystemStatus,
} from './services/integration';
import { LoadingService } from './services/loading.service';
import { ByteFormatterPipe } from './pipes/byte-formatter.pipe';
import { DatePipe, DecimalPipe, PercentPipe, Location } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { XPIconComponent } from 'ngx-xp-icons';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { join } from './services/utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainMenubarComponent,
    MainSidepanelComponent,
    ViewerComponent,
    ByteFormatterPipe,
    DatePipe,
    DurationPipe,
    DecimalPipe,
    PercentPipe,
    XPIconComponent,
    ReactiveFormsModule,
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
  formData = {
    pathSearch: null,
  };

  selectedFolder?: ModelFile;

  form = new FormGroup<any>({});

  private updateSystemStatusInterval?: number;

  constructor(
    private readonly systemService: SystemService,
    private readonly loadingService: LoadingService,
    private readonly fileService: FileService,
    private readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly _location: Location
  ) {
    this.route.queryParams.subscribe({
      next: (params) => {
        const path = params['path'];
        if (path)
          this.fileService.getFile(path).subscribe({
            next: (data: ModelFile) => {
              this._selectItem(data)
            },
            error: (error) => {
              console.error("ERROR NAVIGATING", error)
            },
          });
      },
    });
  }

  ngOnDestroy() {
    if (this.updateSystemStatusInterval)
      clearInterval(this.updateSystemStatusInterval);
  }

  ngOnInit() {

    this.form = new FormGroup<any>({
      pathSearch: new FormControl(this.formData.pathSearch, [
        Validators.required,
      ]),
    });

    this.loadingService.getSubscription().subscribe({
      next: (isLoading) => {
        this.isLoading = isLoading;
      },
    });

    const loadSystemStatus = () => {
      this.systemService.getSystemStatus().subscribe({
        next: (status) => {
          this.systemStatus = status;
        },
        complete: () => {
          this.updateSystemStatusInterval = setTimeout(loadSystemStatus, 5000);
        },
      });
    };

    this.updateSystemStatusInterval = setTimeout(loadSystemStatus, 5000);

    const commonFolderSubscribe = {
      next: (folders: CommonFolder[]) => {
        this.commonFolders = folders;
        let selected = folders.filter((f) => f.icon === 'home').pop();
        if (selected && !this.selectedFolder) this._selectItem(selected);
      },
      error: (error: any) => {
        console.error('Failed to fetch common folder, retrying', error);
        this.systemService.getCommonFolders().subscribe(commonFolderSubscribe);
      },
    };

    this.systemService.getCommonFolders().subscribe(commonFolderSubscribe);
  }

  selectItem(dirData: ModelFile) {
    let path = dirData.isRoot
      ? dirData.basePath
      : join(
        this.systemStatus?.os.platform || 'linux',
        dirData.basePath,
        dirData.filename,
      );

    if (!dirData.isFolder) return this._selectItem(dirData)
    else this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        path
      },
      queryParamsHandling: 'merge'
    })
  }

  _selectItem(dirData: ModelFile) {
    let path = dirData.isRoot
      ? dirData.basePath
      : join(
          this.systemStatus?.os.platform || 'linux',
          dirData.basePath,
          dirData.filename,
        );
    let observeOrNext: any = {
      next: (value: ModelFile) => {
        console.log('selected file', value);
      },
      error: (error: any) => {},
    };
    if (dirData.isFolder)
      observeOrNext['next'] = (value: ModelFile) => {
        console.log('opened', value);
        this.selectedFolder = value;
        this.form
          .get('pathSearch')
          ?.setValue(
            value.isRoot
              ? value.basePath
              : join(
                  this.systemStatus?.os.platform || 'linux',
                  value.basePath,
                  value.filename,
                ),
          );
      };

    this.fileService.getFile(path).subscribe(observeOrNext);
  }
}
