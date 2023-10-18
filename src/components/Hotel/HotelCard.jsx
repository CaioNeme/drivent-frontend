import styled from 'styled-components';
import { Typography } from '@mui/material';

export default function HotelCard() {
  return (
    <Card>
      <Photo src="https://cdn.homedsgn.com/wp-content/uploads/2014/05/Modern-Mansion-on-Sunset-Plaza-Drive-01.jpg" />
      <Name variant="h2">Driven Resort</Name>
      <Info variant="h3">Tipos de acomodação:</Info>
      <Data variant='h6'>Single e Double</Data>
      <Info variant="h3">Vagas disponíveis:</Info>
      <Data variant='h6'>103</Data>
    </Card>
  );
}

const Card = styled.div`
  width: 196px;
  height: 264px;

  border-radius: 10px;
  background-color: #ebebeb;

  margin: 0px 10px 0px 10px;
  padding: 15px;
`;

const Photo = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
`;

const Name = styled(Typography)`
  font-size: 20px !important;
  font-weight: 400 !important;
  color: #343434 !important;
  margin: 10px 0px 10px 0px !important;
`;

const Info = styled(Typography)`
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #3c3c3c !important;
  margin-bottom: 2px !important;
`;

const Data = styled(Typography)`
  font-size: 12px !important;
  font-weight: 400 !important;
  line-height: 14px !important;
  margin-bottom: 15px !important;
`;
