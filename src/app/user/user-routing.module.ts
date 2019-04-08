import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMainComponent } from './user-main/user-main.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ListDisabledUsersComponent } from './list-disabled-users/list-disabled-users.component';
import { DisabledUsers } from './models/disableuser-model';
import { ListRolesComponent } from './roles/list-roles/list-roles.component';

const routes: Routes = [
    {
        path:'',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path:'list',
        component: ListUserComponent,
    },
    {
        path:'add',
        component:AdduserComponent
    },
    {
      path: 'profile/create',
      component: CreateProfileComponent
    },
    {
      path: 'profile/edit/:_id',
      component: EditProfileComponent
    },
    {
      path: 'profile/view/:_id',
      component: ViewProfileComponent
    },
    {
      path: 'profile/view/:_id',
      component: DeleteDialogComponent
    },
    {
      path: 'disabled_users',
      component: ListDisabledUsersComponent
    },
    {
      path: 'roles_list',
      component: ListRolesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
