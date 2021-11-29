import styled from "styled-components";

export const OrganizationName = styled.p`
  margin-left: 5px;
  display: inline-block;
  font-size: 20px;
`;

export const PercentageText = styled.p`
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
  color: gray;
  font-size: 20px;
`;

export const ShareInput = styled.input`
  width: 4vw;
  border: none;
  font-size: 20px;
  text-align: right;
  box-sizing: border-box;

  &&:hover {
    box-sizing: border-box;
    border: 2px solid gray;
    border-radius: 5px;
  }

  &&:focus {
    outline: none;
    box-sizing: border-box;
    border: 2px solid black;
    border-radius: 5px;
  }
`;

export const RedFont = styled.p`
color: red;
font-style: italic;
margin-top: 5px;
margin-left: 7px;

@media only screen and (max-width: 350px) {
  font-size: 14px;
}
`;
