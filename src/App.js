import { CssBaseline } from "@mui/material";
import {
  AuthProvider,
  ModalProvider,
  SnackBarProvider,
  ColorModeProvider,
} from "./contexts";
import AppRouter from "./routes/AppRouter.jsx";

const App = () => {
  return (
    <>
      <ColorModeProvider>
        <AuthProvider>
          <ModalProvider>
            <SnackBarProvider>
              <AppRouter />
            </SnackBarProvider>
          </ModalProvider>
        </AuthProvider>
      </ColorModeProvider>
      <CssBaseline />
    </>
  );
};

export default App;
