import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Feito com ❤️ por "}
      <MuiLink color="inherit" href="https://www.genap.com.br/">
        Guilherme Lima
      </MuiLink>{" "}
      para o TLC ONLINE {new Date().getFullYear()}.
    </Typography>
  );
}
