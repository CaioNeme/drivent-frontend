import styled from 'styled-components';
import { Typography } from '@mui/material';

export default function PickHotel() {
  return <StyledTypography variant={'h6'}>Primeiro, escolha seu hotel</StyledTypography>;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  color: #8e8e8e;
`;
