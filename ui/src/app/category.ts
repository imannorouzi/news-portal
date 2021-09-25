export class Category {
  id;
  name = '';
  checked = false;

  constructor(name = '', checked: boolean = false) {
    this.name = name;
    this.checked = checked;
  }
}
