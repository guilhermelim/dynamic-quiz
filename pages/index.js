import * as React from "react";
import Head from "next/head";
import Copyright from "../src/Copyright";
import Quiz from "../src/components/Quiz";
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Button,
  Modal,
  Fade,
  Backdrop, // Certifique-se de adicionar esta linha
  // ... quaisquer outras importações do MUI que você possa ter
} from "@mui/material";
import quizes from "../src/quizes";

export default function Index() {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Armazena os resultados e as respostas selecionadas para cada quiz
  const [results, setResults] = React.useState(
    quizes.map(() => ({ score: 0, answers: [] }))
  );

  // Manipula o resultado do quiz, atualizando o estado de results
  const handleQuizResult = (index, total, answers) => {
    const newResults = [...results];
    newResults[index] = { score: total, answers };
    setResults(newResults);
  };

  // Funções de controle do Stepper
  const handleNext = () => {
    if (activeStep === quizes.length - 1) {
      handleOpenModal();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStepClick = (stepIndex) => setActiveStep(stepIndex);

  const generateLeadershipStyle = () => {
    const leadershipDescriptions = [
      "Baixíssimo",
      "Baixo",
      "Médio",
      "Alto",
      "Altíssimo",
    ];
    const thresholds = [10, 18, 26, 34, 42];
    return results.map((result) => {
      const idx = thresholds.findIndex((threshold) => result.score < threshold);
      return leadershipDescriptions[idx] || "Altíssimo";
    });
  };

  const leadershipStyles = generateLeadershipStyle();
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Container maxWidth="md">
      <Head>
        <title>Teste Estilo de Liderança</title>
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Teste Estilo de Liderança
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stepper activeStep={activeStep} alternativeLabel>
          {quizes.map((quiz, index) => (
            <Step key={quiz.titulo}>
              <StepLabel
                onClick={() => handleStepClick(index)}
                style={{ cursor: "pointer" }}
              >
                {quiz.titulo}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep < quizes.length && (
          <Quiz
            {...quizes[activeStep]}
            selectedAnswers={results[activeStep].answers}
            onResultChange={(total, answers) =>
              handleQuizResult(activeStep, total, answers)
            }
          />
        )}

        <Box mt={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5">Resultado</Typography>
              <Typography variant="body1">
                Intensidade de cada estilo de liderança em sua personalidade.
              </Typography>
              {results.map((result, idx) => (
                <Typography key={idx} variant="body2">
                  Soma {quizes[idx].titulo}:{" "}
                  {generateLeadershipStyle(result.score)} ({result.score})
                </Typography>
              ))}
              <Typography variant="body1" sx={{ pt: 2 }}>
                Fonte de pesquisa: Extraído do livro Gente de resultados,
                escrito por Eduardo Ferraz
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {activeStep < quizes.length && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Voltar
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === quizes.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </Box>
        )}

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={openModal}>
            <Card elevation={6} sx={{ width: "80%", maxWidth: "500px", p: 3 }}>
              <Typography variant="h5">Resultado</Typography>
              {/* Aqui, você pode formatar seu resultado como preferir */}
              {results.map((result, idx) => (
                <Typography key={idx} variant="body2">
                  Soma {quizes[idx].titulo}: {leadershipStyles[idx]} (
                  {result.score})
                </Typography>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
                sx={{ mt: 3 }}
              >
                Fechar
              </Button>
            </Card>
          </Fade>
        </Modal>

        <Box sx={{ mt: 6 }}>
          <Copyright sx={{ pt: 2 }} />
        </Box>
      </Box>
    </Container>
  );
}
