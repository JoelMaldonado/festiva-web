import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddClubComponent } from './components/add-club/add-club.component';
import { ClubLocationComponent } from './components/club-location/club-location.component';
import { ClubService } from '@services/club.service';
import { Club } from '@dto/club';

@Component({
  selector: 'app-list-clubs',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ClubLocationComponent,
    DialogModule,
    AddClubComponent,
    InputTextModule,
  ],
  templateUrl: './list-clubs.component.html',
})
export class ListClubsComponent implements OnInit {
  clubs: Club[] = [];
  clubsFiltered: Club[] = [];

  clubService = inject(ClubService);

  filter = '';

  showForm = false;

  search() {
    if (this.filter.length === 0) {
      this.clubsFiltered = this.clubs;
    } else {
      this.clubsFiltered = this.clubs.filter((club) =>
        club.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }

  ngOnInit(): void {
    this.getClubs();
  }

  value: string | undefined;
  visible = false;
  selectedClubId: number | null = null;
  isLoading = false;
  router = inject(Router);

  onSavedClub() {
    this.showForm = false;
    this.getClubs();
  }

  getClubs() {
    this.isLoading = true;
    this.clubService
      .fetchAll()
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.clubs = res.data ?? [];
            this.clubsFiltered = res.data ?? [];
          } else {
            console.error(res.message);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'clubs', id, path]);
  }

  toDetail(id: number) {
    this.router.navigate(['menu', 'clubs', id]);
  }

  openDrawer(id: number) {
    this.selectedClubId = id;
    this.visible = true;
  }

  findPhones(id: number) {
    this.clubService.fetchClubPhones(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res.data);
        } else {
          console.error(res.message);
        }
      },
    });
  }
}
