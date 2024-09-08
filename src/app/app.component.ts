import { Component } from '@angular/core';
import { DataPageComponent } from './data-page/data-page.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MonitorPageComponent } from './monitor-page/monitor-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AngularToastifyModule} from 'angular-toastify';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DataPageComponent,
    AnalysisPageComponent,
    MonitorPageComponent,
    MatTabsModule,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    AngularToastifyModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task';
}
