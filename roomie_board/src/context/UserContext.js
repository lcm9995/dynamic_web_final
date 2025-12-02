import { createContext, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const valuesToShare = {
    currentUser,
    setCurrentUser,
  };
  return (
    <UserContext.Provider value={valuesToShare}>
      {children}
    </UserContext.Provider>
  );
}
export { UserProvider };
export default UserContext;
