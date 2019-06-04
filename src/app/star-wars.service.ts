import { LogService } from "./log.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";

// service에서 다른 service의 함수나 state를 참고할때에는
// 사용을하는 service에서  decolartion을써야한다
@Injectable()
export class StarWarsService {
  private logService;
  private http;
  // 1.rxjs에서 제공하는subject를 이니셜라이징한다
  // 이 이벤트는 다른컴포넌트에서 subscribe를할수있다.
  characterChanged = new Subject<void>();

  constructor(logService: LogService, http: HttpClient) {
    this.logService = logService;
    this.http = http;
  }

  private characters = [
    { name: "mimi", side: "dark" },
    { name: "dasbader", side: "dark" },
    { name: "evil", side: "dark" }
  ];

  fetchCharacters() {
    // httpClient을 사용하기위해선 app.module에 httpClientModule을 임포트해야한다.
    this.http.get("https://swapi.co/api/people/").subscribe(response => {
      const data = response.results.map(char => {
        return { name: char.name, side: "" };
      });
      this.characters = data;
      // 이 fetchCharacter함수를 불러오는 컴포넌트에서는 이미 이함수가 data를 다불러들어오기전에 characters를보여주고있다.
      // 그래서 event를 emit해서 그것을 대기하고잇다가 받게해서
      this.characterChanged.next();
    });
    // post 방식
    // this.http
    //   .post("url", { name: "practice post" })
    //   .subscribe((transformedData: any) => {
    //     console.log(transformedData);
    //   });
  }
  // 이렇게 state바꾸는것은 browser에서 reactive하게나오지않는다 그래서 rxJS라는걸 써야한다 ㅅㅂ
  // rxjs-compat을 설치한다 rxjs는이미 앵귤러에 설치되어있다
  getCharacters(chosenSide) {
    if (chosenSide === "all") {
      return this.characters;
    }
    return this.characters.filter(char => {
      return char.side === chosenSide;
    });
  }

  onSideChosen(info) {
    const index = this.characters.findIndex(char => char.name === info.name);
    this.characters[index].side = info.side;
    // 2. 사용할부분에서 initialising할 이벤트를 emit한다 next()르하면된다.
    this.characterChanged.next();
    this.logService.writeLog(info.name + " choosed " + info.side);
  }

  createChar(name, side) {
    const newChar = { name, side };
    const index = this.characters.findIndex(char => char.name === name);
    if (index !== -1) {
      return;
    }
    this.characters.push(newChar);
  }
}
