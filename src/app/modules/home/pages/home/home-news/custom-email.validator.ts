import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeApiService } from '../../../services/home-api.service';

export class CustomEmailValidator {
  static createValidator(homeApiService: HomeApiService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return homeApiService.checkIfEmailExists(control.value).pipe(
        map((result: boolean) => {
          return result ? null : { emailAlreadyExists: true };
        })
      );
    };
  }
}
