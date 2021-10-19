import styled from 'styled-components';

export const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  grid-column-gap: 50px;
  grid-row-gap: 40px;
`;
