import * as React from 'react';

import '../../css/common.css';

export interface ITextInputProps {
  label: string,
  name: string,
  onChange: (e?: any) => void,
}
export default function TextInput(props: ITextInputProps) {
  const { label, name, onChange } = props;

  return (
    <div className="flex-row">
      <label>{label}</label>
      <input
        type="text"
        onChange={(e) => onChange(e)}
        name={name}
      />
    </div>
  )
}