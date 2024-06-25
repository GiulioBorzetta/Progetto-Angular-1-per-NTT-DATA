import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FilterComponent,
    CreateUserComponent,
    CreatePostComponent,
    CreateCommentComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FilterComponent,
    CreateUserComponent,
    CreatePostComponent,
    CreateCommentComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule
  ]
})
export class SharedModule { }
