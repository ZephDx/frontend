import { Component, OnInit } from '@angular/core';
import { Villain } from '../villain'
import { VillainService } from '../villain.service'
import { MessageService } from '../message.service';
 
@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {

 villains: Villain[] = [];

selectedVillain?: Villain;
  constructor(
    private villainService: VillainService,
    ) { }

  ngOnInit(): void {
    this.getVillains();
  }


  getVillains(): void {
    this.villainService.getVillains()
    .subscribe(villains => this.villains = villains);

  }

}


