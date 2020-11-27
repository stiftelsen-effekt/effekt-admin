import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import { grey15 } from "../../../../config/colors";
import calendar from '../../../../assets/calendar.svg'

export const EffektDatePicker = styled(ReactDatePicker)`
    font-family: 'Roboto';
    font-weight: 300;
    background: #eee;
    border: none;
    border-bottom: 1px solid ${grey15};
    padding: 8px;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 36px;
    background-image: url('${calendar}');
    background-position: 6px 6px;
    background-size: 20px;
    background-repeat: no-repeat;
    width: 155px;
`