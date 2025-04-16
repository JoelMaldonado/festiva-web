import { inject, Injectable } from '@angular/core';
import { Club } from '@interfaces/club';
import { Result } from '@interfaces/result';
import { ClubService } from '@services/club.service';
import { ClubRepository } from 'app/domain/repository/club.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubRepositoryImpl extends ClubRepository {
  service = inject(ClubService);

  override fetchAll(): Observable<Result<Club[]>> {
    return this.service.fetchAll();
  }
}
