import { CssBaseline } from "@mui/material";
import {
  AuthProvider,
  ModalProvider,
  SnackBarProvider,
  ColorModeProvider,
} from "./contexts";
import AppRouter from "./routes/AppRouter.jsx";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <>
      <ColorModeProvider>
        <AuthProvider>
          <ModalProvider>
            <SnackBarProvider>
              <HelmetProvider>
                <AppRouter />
              </HelmetProvider>
            </SnackBarProvider>
          </ModalProvider>
        </AuthProvider>
      </ColorModeProvider>
      <CssBaseline />
    </>
  );
};

export default App;
