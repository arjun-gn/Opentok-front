import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  showFiller = false;
  isOpen: boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  toggle() {}
}
