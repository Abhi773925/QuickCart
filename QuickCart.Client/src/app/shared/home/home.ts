import { Component } from '@angular/core';
import { Herosection } from "../herosection/herosection";
import { CategoriesList } from "../../features/categories-list/categories-list";

@Component({
  selector: 'app-home',
  imports: [Herosection, CategoriesList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
