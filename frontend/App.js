import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import Routes from './components/Routes'
import Chat from "./components/IndexComponents/Chat";
import RideDetails from "./components/RideDetailComponents/RideDetails";


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
      <NativeBaseProvider>
        {/* <Routes/> */}
        {/* <Chat/> */}
        <RideDetails/>
      </NativeBaseProvider>
  );
}


