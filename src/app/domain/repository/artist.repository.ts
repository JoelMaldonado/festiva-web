import { CreateArtistRequest } from '@dto/request/create-artist.request';
import { Artist } from 'app/data/dto/artist';

export abstract class ArtistRepository {
  abstract fetchAll(): Promise<Artist[]>;
  abstract create(request: CreateArtistRequest): Promise<void>;
}
