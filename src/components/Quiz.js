import * as React from "react";
import {
  Container,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Card,
  CardContent,
} from "@mui/material";

const Quiz = ({ titulo, perguntas, onResultChange }) => {
  const [answers, setAnswers] = React.useState(
    Array(perguntas.length).fill(null)
  );
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const newTotal = answers.reduce(
      (acc, curr) => acc + (curr ? parseInt(curr, 10) : 0),
      0
    );
    setTotal(newTotal);

    // Informar o Index da nova pontuação
    onResultChange(newTotal);
  }, [answers]);

  const handleAnswerChange = (index, newValue) => {
    const newAnswers = [...answers];
    newAnswers[index] = newValue;
    setAnswers(newAnswers);
  };

  return (
    <Card elevation={3} style={{ marginTop: "20px" }}>
      <CardContent>
        <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {titulo}
            </Typography>
            <FormControl component="fieldset">
              {perguntas.map((pergunta, index) => (
                <Box key={index} sx={{ my: 2 }}>
                  <FormLabel component="legend">{pergunta}</FormLabel>
                  <RadioGroup
                    row
                    aria-label={`pergunta-${index}`}
                    name={`pergunta-${index}`}
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Nunca"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Pouco"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Medianamente"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="Muito"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="Sempre"
                    />
                  </RadioGroup>
                </Box>
              ))}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">
                  Sua pontuação total é: {total}
                </Typography>
              </Box>
            </FormControl>
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
};

export default Quiz;
