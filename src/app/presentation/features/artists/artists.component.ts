import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artists',
  imports: [RouterModule],
  template: ` <router-outlet /> `,
})
export class ArtistsComponent {}
