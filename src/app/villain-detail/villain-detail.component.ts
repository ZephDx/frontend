import { Component, OnInit, Input } from '@angular/core';
import { Villain } from '../villain';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {

 villain: Villain | undefined

  constructor(
    private router:ActivatedRoute,
    private villainService:VillainService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  getVillain(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id).subscribe(villain => this.villain = villain);
  }

  goBack():void {
    this.location.back();
  }

  save(): void {
    if(this.villain){
      this.villainService.updateVillain(this.villain).subscribe(() => this.goBack())
    }
  }
}
