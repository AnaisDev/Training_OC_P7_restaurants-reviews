// /// <reference types="@types/googlemaps" />
import { Component, Input } from "@angular/core";

@Component({
  selector: "greenButton",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.styl"],
})
export class ButtonComponent {
  @Input() type: "button" | "submit" = "button";

  constructor() {}
}
