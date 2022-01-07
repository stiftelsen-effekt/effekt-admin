import styled from 'styled-components';
import { grey30 } from '../colors';

export const MainHeader = styled.h1`
  border-left: 6px solid black;
  color: black;
  font-family: 'ESKlarheitKurrent';
  font-size: 30px;
  font-weight: normal;
  padding: 14px 30px;
  width: 100%;
  box-sizing: border-box;
  max-width: 1024px;
`;
export const SubHeader = styled.h2`
  border-left: 4px solid black;
  color: black;
  font-family: 'ESKlarheitKurrent';
  font-size: 22px;
  font-weight: normal;
  padding: 6px 15px;
  width: 100%;
  box-sizing: border-box;
  max-width: 1024px;
`;
export const Box = styled.div`
  border-left-style: solid;
  border-left-width: 6px;
  border-left-color: #aaa;
  background: #eee;
  padding: 14px 28px;
  margin-bottom: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1024px;

  .header {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
  }
`;

export const RedBox = styled(Box)`
  border-left-color: #444;
  background: #eee;
  color: black;
`;

export const GreenBox = styled(Box)`
  border-left-color: #444;
  background: #eee;
  color: black;
`;

interface IResourceHeaderProps {
  hasSubHeader?: boolean;
}
export const ResourceHeader = styled.h1<IResourceHeaderProps>`
  color: black;
  font-family: 'ESKlarheitKurrent';
  font-size: 36px;
  font-weight: normal;
  padding: 14px 25px;
  padding-left: 0;
  width: 100%;
  box-sizing: border-box;
  max-width: 1024px;

  ${(props: IResourceHeaderProps) => (props.hasSubHeader ? 'margin-bottom: 0px' : '0')}
`;

export const ResourceSubHeader = styled.h2`
  color: ${grey30};
  font-family: 'ESKlarheitGrotesk';
  text-transform: uppercase;
  font-weight: 300;
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 28px;
`;
