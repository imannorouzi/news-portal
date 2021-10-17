export class Category {
  id = -1;
  name = '';
  checked = false;

  constructor(name = '', checked: boolean = false) {
    this.name = name;
    this.checked = checked;
  }
}
