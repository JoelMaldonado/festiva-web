import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  imports: [RouterModule],
  template: ` <router-outlet />`,
})
export class PanelAdminComponent {}
