const Histoslider: React.FunctionComponent<HistosliderProps>;

declare module "histoslider" {
  import * as React from "react";

  export interface HistosliderBucket {
    x0: number;
    x: number;
    y: number;
  }

  export interface HistosliderProps {
    data: Array<HistosliderBucket>;
    padding?: number;
    width?: number;
    height?: number;
    selection: [number, number];
    step?: number;
    labels?: boolean;
    onChange([number, number]): void;

    selectedColor?: string;
    unselectedColor?: string;
    barBorderRadius?: number;

    barStyle?: React.StyleHTMLAttributes;
    histogramStyle?: React.StyleHTMLAttributes;
    sliderStyle?: React.StyleHTMLAttributes;

    showOnDrag?: boolean;
    style?: any;
    handleLabelFormat?: string;
    disableHistogram?: boolean;
    showLabels?: boolean;
    children?: ReactNode;
  }

  export default Histoslider;
}
