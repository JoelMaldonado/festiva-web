import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { ClubSocialNetworkService } from 'app/services/club-social-network.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { delay } from 'rxjs';
import { AppTopComponent } from '../../../../components/app-top.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SocialNetworkService } from '@services/social-network.service';
import { SocialNetwork } from '@model/social-network';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-club-social-networks',
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    AppTopComponent,
    SelectModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './club-social-networks.component.html',
})
export class ClubSocialNetworksComponent implements OnInit {
  private readonly clubSocialNetworkService = inject(ClubSocialNetworkService);
  private readonly socialNetworkService = inject(SocialNetworkService);

  @Input() idClub?: string;

  listClubSocialNetworks: any = [];
  isLoading = false;
  isLoadingSave = false;

  socialNetworks: SocialNetwork[] = [];
  socialNetworkSelected?: SocialNetwork;

  url?: string;

  ngOnInit(): void {
    this.getAll();
    this.getAllSocialNetworks();
  }

  getAllSocialNetworks() {
    this.socialNetworkService.fetchAll(1).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.socialNetworks = res.data || [];
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  add() {
    this.isLoadingSave = true;
    const query = {
      idClub: Number(this.idClub),
      idSocialNetwork: this.socialNetworkSelected?.id,
      url: this.url,
    };
    this.clubSocialNetworkService
      .create(query)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
            this.socialNetworkSelected = undefined;
            this.url = undefined;
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error creating social network:', error);
        },
        complete: () => {
          this.isLoadingSave = false;
        },
      });
  }

  getAll() {
    this.isLoading = true;
    this.clubSocialNetworkService
      .getAll(this.idClub!)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.listClubSocialNetworks = res.data || [];
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error fetching social networks:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  remove(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.clubSocialNetworkService.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error deleting social network:', error);
        },
      });
    }
  }
}
