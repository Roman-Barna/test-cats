import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  Animals,
  AnimalsDataService,
  Breeds,
} from '../interfaces/animals.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  constructor(private http: HttpClient) {}

  getAnimalsData(data: AnimalsDataService): Observable<Animals[]> {
    return this.http.get(
      `${environment.apiUrl}the${data.type}api.com/v1/images/search?size=med&limit=${data.limit}&has_breeds=true&breed_ids=${data.filter}&api_key=${environment.apiKey}`
    ) as Observable<Animals[]>;
  }

  getBreeds(type: string): Observable<Breeds[]> {
    return this.http.get(
      `${environment.apiUrl}the${type}api.com/v1/breeds?limit=20`
    ) as Observable<Breeds[]>;
  }
}
