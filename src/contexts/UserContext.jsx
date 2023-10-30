import { createContext, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  const [userActivities, setUserActivities] = useState([]);
  
  return (
    <UserContext.Provider value={{ userData, setUserData, userActivities, setUserActivities }}>
      {children}
    </UserContext.Provider>
  );
}
