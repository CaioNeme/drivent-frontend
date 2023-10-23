import { useContext } from "react"
import styled from "styled-components"
import PaymentContext from "../../contexts/PaymentContext"

export default function TicketCard(){
    const {priceTicket, hotelTicket, typeTicket} = useContext(PaymentContext)
    return (
        <>
            <CardContainer>
                <h4>{typeTicket} {hotelTicket ? '+ Com Hotel' : ''}</h4>
                <h3>R${priceTicket}</h3>
            </CardContainer>
        </>
    )
}

const CardContainer = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
    flex-direction: column;
    background-color: #FFEED2;
    width: 290px;
    height: 108px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    h4{
        font-family: Roboto;
        font-weight: 400;
        font-size: 16px;
        line-height: 18.75px;
        
    }
    h3{
        color: #898989;
        font-family: Roboto;
        font-weight: 400;
        font-size: 14px;
        line-height: 16.41px;
        margin-top: 5px;
    }
`