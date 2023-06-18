import { OnDestroy,Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Animals, AnimalsDataService } from 'src/app/interfaces/animals.interface';
import { AnimalsService } from 'src/app/services/animals.service';
import { LoadingService } from 'src/app/services/loading.service';
import { getAnimalsDataAction } from 'src/app/state/cats.actions';
import { AnimalsSelectors } from 'src/app/state/cats.selectors';
import { DetailsAnimalsComponent } from '../details-animals/details-animals.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  @Select(AnimalsSelectors.animalItems) animalsData$!: Observable<Animals[]>
  @Select(AnimalsSelectors.searchField) searchField$!: Observable<string>
  searchField!: string
  animalsType!: string

  constructor(public dialog: MatDialog, public loadingService: LoadingService, private route: ActivatedRoute, private animalsService: AnimalsService, private store: Store) {
    this.subsscribeSearchFilter()
    this.getParams()
  }

  getParams() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params | { type: string }) => {
        this.animalsType = params.type
        this.getDataAnimals()
      });
  }
  
  getDataAnimals() {
    const data: AnimalsDataService = {
      limit: 10,
      filter: "",
      type: this.animalsType
    }
    this.animalsService.getAnimalsData(data) 
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: (data: Animals[]) => {
        this.store.dispatch(new getAnimalsDataAction(data));
      },
    });
  }

  subsscribeSearchFilter() {
    this.searchField$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => this.searchField = data)
  }

  openDialog(animals: Animals) {
    this.dialog.open(DetailsAnimalsComponent, {data: animals});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
