import { Component, OnInit, Input } from "@angular/core";
import { StarWarsService } from "../star-wars.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
  // constructor에 전달된 service의 type을모르기때문에ㅣ
  // 2. providers라는 configuration을 추가해서 불러올 service의 type을 넣는다.
  // 하지만 각각의 컴포넌트에서 이렇게하는것 역시 각기다른instance 를 창조하기때문에
  // 같은 state를 조작하지 못한다 그럼 어디? app.module에다가 해야한다.
  // providers: [StarWarsService]
})
export class ItemComponent implements OnInit {
  @Input() character;

  // swService 를 사용하기 때문에 이방법은 필요없다.
  // @Output() assignSide = new EventEmitter<{ name: string; side: string }>();

  // service는 redux store개념의 angular자체에서 제공하는기능이다.
  // dependecy injection 모든컴포넌트가 같은 service의 instance를공유하기위해 angular에다가 명령해야함
  swService: StarWarsService;
  constructor(swService: StarWarsService) {
    // 1. constructor에 swservice넣고 그것을 이컴포넌트안에 attribute로만든다
    this.swService = swService;
  }
  onAssignSide(side) {
    // this.assignSide.emit({ name: this.character.name, side });
    // reduxstore(service) 를사용한방법
    // 이렇게 컴포넌트마다 new instance를만들면 각각 독립된 instance라서 공통된 state를 바꿀수없게된다.
    // const service = new StarWarsService();
    // 그러므로 dependecy injection이라는 개념을써야한다.

    this.swService.onSideChosen({ name: this.character.name, side });
  }
  ngOnInit() {}
}
