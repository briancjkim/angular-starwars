import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StarWarsService } from "../star-wars.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})

// subscription을 취소하기위해서 onDestroy를 implements한다.
export class ListComponent implements OnInit, OnDestroy {
  characters = [];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;

  /* 이방법은 redux store개념의 service를사용하면서 사용할 컴포넌트에서 직접 store에 접근할거기때문에 지운다.
    // list 컴포넌트의 event를만들었다
    // list에서 부모컴포넌트로 방출시킬 이벤트
    // @Output() assignSide = new EventEmitter<{ name: string; side: string }>();


    // onAssignSide(info) {
    //   // itemComponent에서 assignSide가 실행될때 구현될 함수
    //   // list 컴포넌트에서 만든 assignSide를 부모로 방출시킨다.
    //   this.assignSide.emit(info);
    // }
  */
  loadedSide = "all";
  // subscription을 property로만들어놓는다. destroy하기위해서.
  subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }
  //3가지 인자를 받는다.
  ngOnInit() {
    // fetch함수를부른다 하지만 동기라서 fetch시간걸리니까  이것이 실행되면 받아들이도록 characterchanged를 subscribe를한다.
    // characterChanged는 이미 아래에서 섭스크라이브하고있으니 따로 안해줘도된다.
    // 이함수는 List컴포넌트가 열릴때마다 새로시작한다 즉 계속 fetCh를해서 내가 데이터 입력한것도 사라지고 fetch 한것을 넣게된다 그래서
    // 해결책은 app.component에서 fetchCharacters()를 하는것이다.
    // this.swService.fetchCharacters();
    // params이 바뀌는걸 보고있다.
    this.activatedRoute.params.subscribe(params => {
      this.characters = this.swService.getCharacters(params.side);
      this.loadedSide = params.side;
    });

    // 3.rxjs의 subejct event 를호출한다.
    // onSideChose이 item컴포넌트에서 실행됬는지 안됬는지 subscribe해서 실행됬다면 list를다시불러들여와야하기때문이다.
    // rxjs의 subscription은 angular subscription과는 다르게 angular가 자동으로 destroy해주지않는다 그래서 우리가 직접해줘야한다.
    this.subscription = this.swService.characterChanged.subscribe(() => {
      this.characters = this.swService.getCharacters(this.loadedSide);
    });
  }
  // 컴포넌트가 destroy되면 실행되는 함수이다. 내가 만든 rxjs subscribe가 컴포넌트끝나도 계속memory에서 실행되므로 이것을 컴포넌트가 닫히면 종료시킬거다.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
