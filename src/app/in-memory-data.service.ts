import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Villain } from './villain';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const villains = [
      { id: 11, name: 'Dr BadMood' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'BulletMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr Thunder' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Giganotossauro' }
    ];
    return {villains};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(villains: Villain[]): number {
    return villains.length > 0 ? Math.max(...villains.map(villain => villain.id)) + 1 : 11;
  }
}