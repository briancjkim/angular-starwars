import { Component, OnInit, Input } from "@angular/core";
import { StarWarsService } from "../star-wars.service";

@Component({
  selector: "app-create-character",
  templateUrl: "./create-character.component.html",
  styleUrls: ["./create-character.component.css"]
})
export class CreateCharacterComponent implements OnInit {
  swService;
  availableSides = [
    { display: "None", value: "" },
    { display: "Light", value: "light" },
    { display: "Dark", value: "dark" }
  ];
  @Input() defaultName: "chanjong";
  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {}

  onSubmit(submittedForm) {
    // required input이 제공되지않으면 form은invalid된다.
    if (submittedForm.invalid) {
      return;
    }
    const { name, side } = submittedForm.value;

    this.swService.createChar(name, side);
  }
}
