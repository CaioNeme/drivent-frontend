import { useState, useEffect } from 'react';
import {
  Title,
  SubTitle,
  SubTitleAccommodation,
  SubTitleCard,
  EnrollmentErrorMessage,
  CenteredContent,
} from './titleSubTitle';
import { BoxesContainer, StyledBox, Value, Label } from './boxOptions';
import { ReserveButton } from './reserveButton';
import useTicketType, { useTicket } from '../../hooks/api/useTicket';
import AccommodationOptions from './AccommodationOptions';
import useEnrollment from '../../hooks/api/useEnrollment';

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAccommodationOption, setSelectedAccommodationOption] = useState(null);
  const [reservaFinalizada, setReservaFinalizada] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketTypes = useTicketType();
  const ticket = useTicket();
  const enrollmentUser = useEnrollment();

  console.log(enrollmentUser);

  useEffect(() => {
    if (ticket.ticket !== null) {
      // Se o usuário já tiver um ticket, defina reservaFinalizada como true.
      setReservaFinalizada(true);
    }
  }, [ticket]);

  const resetStates = () => {
    setSelectedOption(null);
    setSelectedAccommodationOption(null);
    setSelectedTicket(null);
  };

  const handleBoxClick = (index) => {
    if (selectedOption === index) {
      resetStates(); // Reseta os estados se o botão for clicado novamente
    } else {
      resetStates(); // Reseta os estados ao selecionar uma nova opção
      setSelectedOption(index);
      setSelectedTicket(ticketTypes.tickets[index]);
    }
  };

  function calcularSomaTotal() {
    let total = 0;

    if (selectedOption !== null) {
      total += ticketTypes.tickets[selectedOption].price;
    }

    if (selectedAccommodationOption !== null) {
      if (selectedAccommodationOption === 'Option1') {
        total += 350; // Use o valor correto
      }
    }

    return total;
  }

  const finalizarReserva = async () => {
    if (selectedTicket) {
      try {
        const response = await ticketTypes.createTicket(selectedTicket.id);
        console.log('Ticket criado com sucesso:', response);
        setReservaFinalizada(true);
      } catch (error) {
        console.error('Erro ao criar o ticket:', error);
      }
    } else {
      console.error('Nenhum ticket selecionado.');
      console.log(selectedTicket.id);
    }
  };

  return (
    <>
      <Title>Ingresso e pagamento</Title>

      {enrollmentUser.enrollment === null ? (
        <CenteredContent>
          <EnrollmentErrorMessage>
            Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
          </EnrollmentErrorMessage>
        </CenteredContent>
      ) : reservaFinalizada ? (
        <>
          <div>
            <SubTitleCard>Ingresso escolhido</SubTitleCard>
          </div>

          {/* Área de pagamento: Cartão */}
        </>
      ) : (
        <>
          <SubTitle>Primeiro, escolha sua modalidade</SubTitle>

          <BoxesContainer>
            {!ticketTypes.ticketLoading &&
              ticketTypes.tickets.map((item, index) => (
                <StyledBox key={index} onClick={() => handleBoxClick(index)} selected={selectedOption === index}>
                  <Value>{item.name}</Value>
                  <Label>{`R$ ${item.price}`}</Label>
                </StyledBox>
              ))}
          </BoxesContainer>

          {selectedOption !== null && selectedTicket.name === 'Presencial' && (
            <>
              <SubTitleAccommodation>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitleAccommodation>
              <AccommodationOptions
                selectedOption={selectedAccommodationOption}
                onOptionSelect={setSelectedAccommodationOption}
                selectedTicket={selectedTicket}
              />
            </>
          )}

          {selectedAccommodationOption !== null && (
            <>
              <SubTitleAccommodation>
                Fechado! O total ficou em R$ {calcularSomaTotal()}. Agora é só confirmar:
              </SubTitleAccommodation>
              <ReserveButton onClick={finalizarReserva}>Finalizar Reserva</ReserveButton>
            </>
          )}

          {selectedOption !== null && selectedTicket.name === 'Online' && (
            <>
              <SubTitleAccommodation>
                Fechado! O total ficou em R$ {calcularSomaTotal()}. Agora é só confirmar:
              </SubTitleAccommodation>
              <ReserveButton onClick={finalizarReserva}>Finalizar Reserva</ReserveButton>
            </>
          )}
        </>
      )}
    </>
  );
}
