import { Component } from '@angular/core';
import { Header } from "./layout/header/header";
import { Navbar } from "./layout/navbar/navbar";
import { Main } from "./layout/main/main";
import { Footer } from "./layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Header, Navbar, Main, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
