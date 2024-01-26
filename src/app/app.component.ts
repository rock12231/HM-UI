import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HackpostComponent } from './hackpost/hackpost.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HackpostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HM-UI';
  constructor(private httpClient: HttpClient) {}
}
