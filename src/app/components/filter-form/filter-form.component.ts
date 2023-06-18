import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AnimalsService } from 'src/app/services/animals.service';
import { getAnimalsDataAction, setSearchField } from 'src/app/state/cats.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
import { Animals, AnimalsDataService, Breeds } from 'src/app/interfaces/animals.interface';
import { HeaderForm } from 'src/app/interfaces/header-form.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilterFormComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void> = new Subject();
  formGroup!: FormGroup<HeaderForm>;
  selectData!: Breeds[];
  animalsType!: string

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private animalsService: AnimalsService,
    private route: ActivatedRoute
  ) {
    this.getParams()
  }

  getParams() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params | { type: string }) => {
        this.animalsType = params.type
        this.getBreeds(this.animalsType)
        this.createForm();
        this.subscribeToForm();
      });
  }

  getBreeds(type: string) {
    this.animalsService
      .getBreeds(type)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => (this.selectData = data));
  }
  
  createForm() {
    this.formGroup = this.fb.group({
      selectCount: new FormControl(10),
      selectFilter: new FormControl(''),
    });
  }

  setLimitAnimals(limit: number, filter: string) {
    const data: AnimalsDataService = {
      limit,
      filter,
      type: this.animalsType
    }
    this.animalsService
      .getAnimalsData(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: Animals[]) => {
          this.store.dispatch(new getAnimalsDataAction(data));
        },
      });
  }

  subscribeToForm() {
    this.formGroup.controls.selectCount.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((valueCount) => {
        this.setLimitAnimals(valueCount, this.formGroup.controls.selectFilter.value);
      });
      
    this.formGroup.controls.selectFilter.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((valueFilter) => {
        console.log(valueFilter);
        
        this.setLimitAnimals(
          this.formGroup.controls.selectCount.value,
          valueFilter
        );
      });
  }

  inputSearchField($event: any) {
    this.store.dispatch(new setSearchField($event.target.value));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
