declare module "react-awesome-modal" {
  import React from "react";

  interface IProps {
    visible: boolean;
    width: number;
    height: number;
    effect: "fadeInDown" | "fadeInUp" | "fadeInLeft" | "fadeInRight";
    onClickAway(): void;
  }

  const Modal: React.ClassComponent<{}, IProps>;

  export default Modal;
}
