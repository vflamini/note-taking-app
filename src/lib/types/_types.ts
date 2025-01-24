interface CheckboxAttribute {
  isCheckbox: boolean,
  isChecked: boolean
}

export interface Note {
  text: string,
  checkbox: CheckboxAttribute
}