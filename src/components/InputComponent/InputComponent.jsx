import React from 'react'
import styles from './InputComponent.module.css'

function InputComponent({labelValue,InputValue,handelOnChange,inputType,inputName}) {
  return (
    <label className={styles.label}>
      {labelValue}:
      <input
        type={inputType}
        value={InputValue}
        name={inputName}
        onChange={handelOnChange}
        className={styles.input}
      />
    </label>
  )
}

export default InputComponent
