import styled from "styled-components";
import { brown50, grey05 } from "../../../config/colors";

export const FormSection = styled.div`
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 14px;
    border-left: 1px solid ${grey05};
    margin-bottom: 20px;
`

export const FormSectionHeader = styled.h4`
    font-size: 12px;
    text-transform: uppercase;
    padding: 5px 0;
    margin: 0;
    margin-bottom: 10px;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${brown50};
`