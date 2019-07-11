import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import { grey15 } from "../colors";

export const EffektDatePicker = styled(ReactDatePicker)`
    font-family: 'Roboto';
    font-weight: 300;
    background: #eee;
    border: none;
    border-bottom: 1px solid ${grey15};
    padding: 8px;
    font-size: 14px;
    box-sizing: border-box;
`