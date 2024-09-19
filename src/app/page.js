import Image from "next/image";
import AuthContextProvider from "./lib/contexts/AuthContext";
import LoginBtn from "./components/header/LoginBtn";

export default function Home() {
  return (
    
    <AuthContextProvider>
      <LoginBtn/>
    </AuthContextProvider>
  );
}
