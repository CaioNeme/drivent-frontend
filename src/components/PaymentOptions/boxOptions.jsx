import styled from "styled-components";

export const BoxesContainer = styled.div`
  display: flex;
`;

export const StyledBox = styled.div`
  width: 145px;
  height: 145px;
  top: 323px;
  left: 341px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  margin-left: 11px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${(props) =>
    props.selected &&
    `
    background-color: #ffeed2;
  `}
`;

export const Value = styled.div`
  font-size: 16px;
  color: #000;
  margin-bottom: 5px;
`;

export const Label = styled.div`
  font-size: 14px;
  color: #cecece;
`;


export const StyledBoxCard = styled.div`
  width: 290px;
  height: 108px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 26px;
  margin-left: 11px;
  cursor: pointer;
  transition: background-color 0.3s;

  /* ${(props) =>
    props.selected &&
    `
    background-color: #ffeed2;
  `} */
`;