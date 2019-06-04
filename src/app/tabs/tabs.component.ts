import { Component, OnInit } from "@angular/core";
import { StarWarsService } from "../star-wars.service";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"]
  // app.module에다가 해서 모든 app하위 컴포넌트가 같은 provider를 initialise하도록 만들거다.
  // providers: [StarWarsService]
})
export class TabsComponent implements OnInit {
  characters = [];
  chosenSide = "all";
  // dependecy injection 함으로 같은 service instance를공유하게된다.
  swService: StarWarsService;
  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {}
  onChoose(value) {
    this.chosenSide = value;
  }
  getCharacters() {
    // 잘못된 service의 사용 각각 컴포넌트에서 초기화하면안된다. dependecy injection해야한다
    // const swService = new StarWarsService();
    this.characters = this.swService.getCharacters(this.chosenSide);
    return this.characters;
  }
}
