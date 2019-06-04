import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CreateCharacterComponent } from "./create-character.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

//BrowserModule은 app.module에서밖에 안쓰이므로 commonModule을임포트한다
@NgModule({
  declarations: [CreateCharacterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: CreateCharacterComponent }])
  ]
})
export class CreateCharacterModule {}
