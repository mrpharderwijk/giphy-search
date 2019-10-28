import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * MATERIAL DESIGN MODULES
 */
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatToolbarModule,
];

/**
 * COMMON
 */
import { GiphySearchComponent, GiphyListComponent, HeaderComponent } from './common/components';
const commonComponents = [GiphySearchComponent, GiphyListComponent, HeaderComponent];

import { DateAgoPipe } from './common/pipes';
const commonPipes = [DateAgoPipe];

/**
 * FORMS
 */
import { InputTextComponent } from './forms/components';
const formsComponents = [InputTextComponent];

import { DisableControlDirective, SelectOnClickDirective } from './forms/directives';
const formsDirectives = [DisableControlDirective, SelectOnClickDirective];

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ...materialModules],
  declarations: [
    ...commonComponents,
    ...commonPipes,
    ...formsComponents,
    ...formsDirectives,
    GiphyListComponent,
    HeaderComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...commonComponents,
    ...commonPipes,
    ...formsComponents,
    ...formsDirectives,
  ],
  entryComponents: [],
})
export class SharedModule {}
