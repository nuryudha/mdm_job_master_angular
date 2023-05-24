import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';

const materialComponent = [
  MatCardModule,

  MatSelectModule,
  MatSelectFilterModule,
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule,
  MatIconModule,
  MatFormFieldModule,
  FormsModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, materialComponent],
  exports: [materialComponent],
})
export class MaterialModule {}
