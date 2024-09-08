  import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const combinedConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideCharts(withDefaultRegisterables())
  ]
};

bootstrapApplication(AppComponent, combinedConfig)
  .catch((err) => console.error(err));
