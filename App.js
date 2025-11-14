import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import AuthStack from "./src/navigations/AuthStack";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </UserProvider>
  );
}