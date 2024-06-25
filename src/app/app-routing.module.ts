import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'todos', loadChildren: () => import('./pages/todos/todos.module').then(m => m.TodosModule) },
  { path: 'posts', loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule) },
  { path: 'user/:id', loadChildren: () => import('./pages/user-detail/user-detail.module').then(m => m.UserDetailModule) },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
