import { Provider } from "react-redux";
import { store } from "./store";
import Navigation from "./src/components/Navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@rneui/themed";

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const theme = createTheme({
  lightColors: {
    primary: "#033F63",
    secondary: "#F0B01F",
    third: "#FFF3D8",
  },
  darkColors: {
    primary: "#000",
  },
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 10,
      },
    },
  },
  mode: "light",
});

const theme2 = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#033F63",
    secondary: "#F0B01F",
    third: "#FFF3D8",
  },
};

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PaperProvider theme={theme2}>
            <Navigation />
          </PaperProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
