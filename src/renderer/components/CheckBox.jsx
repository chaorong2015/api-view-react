/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-12-23
 * @author Li <li@maichong.it>
 */

// @flow

import React from 'react';

export default class CheckBox extends React.Component {
  static defaultProps = {
    radio: false,
    checked: false,
    label: '',
    disabled: false
  };

  props: {
    radio: boolean;
    checked: boolean;
    label: string;
    disabled: boolean;
    onChange: Function;
  };

  handleCheck = () => {
    const { onChange, checked } = this.props;
    if (onChange) {
      onChange(!checked);
    }
  };

  render() {
    const {
      radio, checked, disabled, label
    } = this.props;

    let className = 'checkbox';
    if (disabled) {
      className += ' disabled';
    }
    if (checked) {
      className += ' checked';
    }

    let icon = 'square-o';
    if (radio) {
      if (checked) {
        icon = 'check-circle';
      } else {
        icon = 'circle-o';
      }
    } else if (checked) {
      icon = 'check-square';
    } else {
      //icon = 'square-o';
    }

    return (
      <label className={className} onClick={disabled ? null : this.handleCheck}>
        <i className={'fa fa-' + icon} />
        {label}
      </label>
    );
  }
}