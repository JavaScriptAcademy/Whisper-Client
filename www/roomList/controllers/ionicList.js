@Page({
  templateUrl: '../../index.html',
})
@Component({
  directives: [IONIC_DIRECTIVES]
})
export class HomePage {
  constructor() {
     console.log("loaded!");
  }
}