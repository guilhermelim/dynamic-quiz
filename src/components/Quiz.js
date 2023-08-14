import * as React from "react";
import { useForm } from "react-hook-form";
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
  const { register, watch, setValue } = useForm();
  const answersWatched = watch();
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const newTotal = perguntas
      .map((_, index) => answersWatched[`pergunta-${titulo}-${index}`])
      .reduce((acc, curr) => acc + (curr ? parseInt(curr, 10) : 0), 0);
    setTotal(newTotal);
    onResultChange(newTotal);
  }, [answersWatched, titulo, perguntas, onResultChange]);

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
                    aria-label={`pergunta-${titulo}-${index}`}
                    name={`pergunta-${titulo}-${index}`}
                    value={answersWatched[`pergunta-${titulo}-${index}`] || ""}
                    onChange={(e) =>
                      setValue(`pergunta-${titulo}-${index}`, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="1"
                      control={
                        <Radio {...register(`pergunta-${titulo}-${index}`)} />
                      }
                      label="Nunca"
                    />
                    <FormControlLabel
                      value="2"
                      control={
                        <Radio {...register(`pergunta-${titulo}-${index}`)} />
                      }
                      label="Pouco"
                    />
                    <FormControlLabel
                      value="3"
                      control={
                        <Radio {...register(`pergunta-${titulo}-${index}`)} />
                      }
                      label="Medianamente"
                    />
                    <FormControlLabel
                      value="4"
                      control={
                        <Radio {...register(`pergunta-${titulo}-${index}`)} />
                      }
                      label="Muito"
                    />
                    <FormControlLabel
                      value="5"
                      control={
                        <Radio {...register(`pergunta-${titulo}-${index}`)} />
                      }
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
