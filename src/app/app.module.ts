import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TabsComponent } from "./tabs/tabs.component";
import { ItemComponent } from "./item/item.component";
import { ListComponent } from "./list/list.component";
import { StarWarsService } from "./star-wars.service";
import { LogService } from "./log.service";

import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

// RouterModule쪽은 AppRoutingModule을 새로만들어서 아예 분리시켰다 퍼포먼스이유로
@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ItemComponent,
    ListComponent,

    HeaderComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  // redux store같은놈
  providers: [StarWarsService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
