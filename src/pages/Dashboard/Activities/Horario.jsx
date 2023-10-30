import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { enrollUserInActivity } from '../../../services/activitiesApi';
import useToken from '../../../hooks/useToken';
import useUserActivities from '../../../hooks/api/useUserActivities.js';

export default function Horario(props) {
  const { activities, day } = props;
  const { getUserActivities } = useUserActivities();
  const token = useToken();
  const [currentActivities, setCurrentActivities] = useState([]);

  useEffect(() => {
    getUserActivities(token).then((res) => {
      const userActitiviesData = res;
      setCurrentActivities(userActitiviesData);
    });
  }, []);

  async function handleClick(activityId, startTime, endTime, day) {
    const data = {
      activityStartTime: startTime,
      activityEndTime: endTime,
      day,
    };
    try {
      await enrollUserInActivity(data, token, activityId);
      setCurrentActivities([...currentActivities, activityId]);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  if (!activities || !currentActivities) {
    return <></>;
  }
  
  return (
    <>
      {activities.map((activity) => (
        <Conteiner key={activity.id} $subscribed={currentActivities.includes(activity.id) ? '#D0FFDB' : '#F1F1F1'}>
          <span>
            <h2>{activity.eventName}</h2>
            <h3>
              {dayjs(activity.startTime).format('HH:mm')} - {dayjs(activity.endTime).format('HH:mm')}
            </h3>
          </span>
          <Traco />
          <Vagas>
            {currentActivities.includes(activity.id) ? (
              <EnrolledButton>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <p>Inscrito</p>
              </EnrolledButton>
            ) : activity.availableSlots > 0 ? (
              <EnrollButton onClick={() => handleClick(activity.id, activity.startTime, activity.endTime, day)}>
                <ion-icon name="enter-outline" />
                <p>{activity.availableSlots}</p>
              </EnrollButton>
            ) : (
              <SoldOutButton>
                <ion-icon name="close-circle-outline" />
                <p>Esgotado</p>
              </SoldOutButton>
            )}
          </Vagas>
        </Conteiner>
      ))}
    </>
  );
}

const Conteiner = styled.div`
  position: relative;
  border: 1px solid #d7d7d7;
  width: 290px;
  height: 70px;
  margin: 10px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 5px;
  background: ${(props) => props.$subscribed};
  span {
    position: absolute;
    top: 22px;
    left: 15px;
    h2 {
      color: #343434;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    h3 {
      color: #343434;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
const Traco = styled.div`
  position: absolute;
  top: 5px;
  right: 70px;
  width: 1px;
  height: 60px;
  background: #cfcfcf;
`;
const Vagas = styled.div`
  position: absolute;
  top: 14px;
  right: 25px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EnrollButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: transparent;

  p {
    color: #078632;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 5px;
  }

  ion-icon {
    display: inline-block;
    font-size: 30px;
    color: #078632;
    cursor: pointer;
  }
`;

const SoldOutButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #c66; 
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  ion-icon {
    display: inline-block;
    font-size: 30px;
    color: #c66;
    cursor: not-allowed;
  }
`;

const EnrolledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background-color: transparent;

  p {
    color: #078632;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  ion-icon {
    display: inline-block;
    font-size: 30px;
    color: #078632;
    cursor: pointer;
  }
`;
