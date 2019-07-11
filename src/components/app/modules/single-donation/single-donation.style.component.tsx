import styled from "styled-components";
import { grey15 } from "../../style/colors"

export const SingleDonationWrapper = styled.div`
    width: 740px;
`

export const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`

const KIDTextArrowSize = '12px';
export const KIDTextWrapper = styled.div`
    position: relative;

    &:after {
        content: '';
        position: absolute;
        left: calc(50% - ${KIDTextArrowSize});
        bottom: -12px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: ${KIDTextArrowSize} ${KIDTextArrowSize} 0 ${KIDTextArrowSize};
        border-color: ${grey15} transparent transparent transparent;
    }
`