import React, {type FunctionComponent} from 'react';

interface OwnProps {
    onClickHandler: () => void;
    title: string;
    disabled: boolean;
}

type Props = OwnProps;

const Button: FunctionComponent<Props> = ({onClickHandler, title, disabled}) => {

  return (<button
      className="p-2 font-mono  rounded border-2
      bg-white hover:bg-gray-300 disabled:bg-gray-900
      text-black hover:text-gray-800 disabled:text-gray-500
      border-black disabled:border-gray-900"
      title={title}
      onClick={onClickHandler}
      disabled={disabled}
  >{title}</button>);
};

export default Button;
