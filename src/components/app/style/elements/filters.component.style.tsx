import styled from "styled-components";
import { azure02, azure50, grey05 } from "../colors";
import { EffektDateRange } from "../../modules/range/date-range.component";
import { EffektInput } from "./input.style";

export const FilterHeader = styled.h2`
    font-size: 24px;
    padding-left: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    background: ${azure50};
    color: white;
    margin-top: 0;
    padding-top: 20px;
    font-weight: 300;
    letter-spacing: 1px;
`

export const FilterWrapper = styled.div`
    width: 300px;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    background: ${azure02};
    box-shadow: 0px 0px 6px 0 rgba(0,0,0,.4);
    box-sizing: border-box;
`

export const FilterGroup = styled.div`
    border-bottom: 1px solid ${grey05};
    padding: 25px 20px;
`

export const FilterGroupHeader = styled.h3`
    font-size: 12px;
    margin-top: 0px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${azure50};
`

export const FilterDateRange = styled(EffektDateRange)`
    input {
        background: white;
    }
`

export const FilterDateRangeWrapper = styled.div`
    input {
        background-color: white;
        width: 108px;
    }
`

export const FilterInput = styled(EffektInput)`
    background: white;
`