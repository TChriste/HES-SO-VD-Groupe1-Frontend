import { Component, OnInit } from '@angular/core';
import {avatar} from '../../avatar';

@Component({
  selector: 'app-avatar-img',
  templateUrl: './avatar-img.component.html',
  styleUrls: ['./avatar-img.component.css']
})
export class AvatarImgComponent implements OnInit {

  constructor() { }

  src: string;

  ngOnInit(): void {
    this.src = this.getAvatar();
  }

  avatarRandom(type: string) {
    return avatar[type][Math.floor(Math.random() * avatar[type].length)];
  }

  getAvatar() {
    return 'https://avataaars.io/?avatarStyle=Circle&topType=' + this.avatarRandom('topType') +
      '&accessoriesType=' + this.avatarRandom('accessoriesType') + '&hairColor=' + this.avatarRandom('hairColor') +
      '&facialHairType=' + this.avatarRandom('facialHairType') + '&clotheType=' + this.avatarRandom('clotheType') +
      '&eyeType=' + this.avatarRandom('eyeType') + '&eyebrowType=' + this.avatarRandom('eyebrowType') +
      '&mouthType=' + this.avatarRandom('mouthType') + '&skinColor=' + this.avatarRandom('skinColor');
  }

}
