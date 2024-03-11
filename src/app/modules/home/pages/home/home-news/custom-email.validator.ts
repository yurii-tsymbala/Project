import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
  } from '@angular/forms';
  import { Observable } from 'rxjs';
  import { map, tap } from 'rxjs/operators';
  import { HomeApiService } from '../../../services/home-api.service';
  
  export class CustomEmailValidator {
    static createValidator(homeApiService: HomeApiService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors|null> => {
        return homeApiService
          .checkIfEmailExists(control.value)
          .pipe(
            tap((value) => console.log("if " + value + " === false -> means email already exists")),
            map((result: boolean) => {
              if (result === false) {
                return { emailAlreadyExists: true }
              }
              else return null;
            }
            )
          );
      };
    }
  }