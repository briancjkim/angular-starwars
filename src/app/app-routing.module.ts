import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabsComponent } from "./tabs/tabs.component";
import { ListComponent } from "./list/list.component";

// /characters는 /characters/all이되고 params은side로 설정
// laodChildren 설정했을시 ngserve다시해야한다
const router = [
  {
    path: "characters",
    component: TabsComponent,
    children: [
      { path: "", redirectTo: "all", pathMatch: "full" },
      { path: ":side", component: ListComponent }
    ]
  },
  {
    path: "new-character",
    loadChildren:
      "./create-character/create-character.module#CreateCharacterModule"
  },
  { path: "**", redirectTo: "characters" }
];

@NgModule({
  imports: [RouterModule.forRoot(router, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
