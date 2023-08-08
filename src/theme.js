import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { deepPurple, teal, orange, red } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[600], // Uma cor primária mais elegante e sofisticada
    },
    secondary: {
      main: teal[500], // Uma cor secundária que se contrasta bem com a primária
    },
    error: {
      main: orange[800], // Uma cor de erro que é menos chocante que o vermelho
    },
    background: {
      default: "#f4f6f8", // Um fundo levemente cinza para melhor contraste
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h4: {
      fontWeight: 500, // Títulos um pouco mais grossos
      marginBottom: "1rem", // Espaço adicional abaixo dos títulos
    },
    h5: {
      fontWeight: 500, // Títulos um pouco mais grossos
    },
  },
  components: {
    MuiButton: {
      // Botões mais atraentes
      styleOverrides: {
        root: {
          textTransform: "none", // Remove a transformação de texto em maiúsculas
          borderRadius: 8, // Bordas um pouco mais arredondadas
          padding: "8px 16px", // Padding um pouco mais espaçoso
        },
      },
    },
    MuiRadio: {
      // Radios com cores primárias
      styleOverrides: {
        root: {
          color: deepPurple[400],
          "&$checked": {
            color: deepPurple[600],
          },
        },
      },
    },
  },
});

export default theme;
