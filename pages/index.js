import * as React from "react";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Quiz from "../src/components/Quiz";
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

export default function Index() {
  const quizes = [
    {
      titulo: "Estilo 1 - PROTETOR",
      perguntas: [
        "Tenho paciência para orientar",
        "Sou compreensivo",
        "Procuro criar um ambiente de trabalho acolhedor",
        "Gosto de conhecer a vida pessoal dos meus liderados",
        "Prefiro ouvir a opinião da maioria antes de decidir",
        "Evito conflitos",
        "Tenho dificuldades de criticar",
        "Sou paternalista",
        "Tolero alguns deslizes para evitar ser rude",
        "Tenho fama de bonzinho",
      ],
    },
    {
      titulo: "Estilo 2 - TRATOR",
      perguntas: [
        "Tenho pouca paciência para orientar",
        "Sou franco",
        "Sou Intolerante",
        "Sou Decidido",
        "Sou impaciente",
        "Sou dominante",
        "Irrito-me com facilidade",
      ],
    },
    {
      titulo: "Estilo 3 - CENTRALIZADOR",
      perguntas: [
        "Sou racional",
        "Sou reservado",
        "Sou desconfiado",
        "Tenho dificuldades em delegar",
        "Sou sistemático (Uma pessoa que sempre age da mesma forma em uma determinada atividade.)",
        "Sou conservador",
        "Sou centralizador",
        "Sou controlador",
        "Prefiro decidir sozinho",
        "Evito riscos",
      ],
    },
    {
      titulo: "Estilo 4 - EMPREENDEDOR",
      perguntas: [
        "Sou empreendedor nato",
        "Gosto de ter sócios",
        "Sou criativo",
        "Prefiro, se possível, participar de vários negócios",
        "Gosto de investimentos ousados",
        "Tenho bom faro para negócios promissor",
        "Delego com facilidade",
        "Odeio rotinas",
        "Sou bom de relacionamentos",
        "Invisto tempo procurando novas oportunidades de negócios",
      ],
    },
    // ... adicione os outros quizzes da mesma maneira
  ];

  const [results, setResults] = React.useState(Array(quizes.length).fill(0));

  const handleQuizResult = (index, total) => {
    const newResults = [...results];
    newResults[index] = total;
    setResults(newResults);
  };

  const generateLeadershipStyle = () => {
    const leadershipDescriptions = [
      "Baixíssimo",
      "Baixo",
      "Médio",
      "Alto",
      "Altíssimo",
    ];

    const thresholds = [10, 18, 26, 34, 42];

    return results.map((score) => {
      const idx = thresholds.findIndex((threshold) => score < threshold);
      return leadershipDescriptions[idx] || "Altíssimo";
    });
  };

  const leadershipStyles = generateLeadershipStyle();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Teste Estilo de Liderança
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {quizes.map((quizData, idx) => (
          <Quiz
            key={idx}
            {...quizData}
            onResultChange={(total) => handleQuizResult(idx, total)}
          />
        ))}

        <Box mt={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5">Resultado</Typography>

              <Typography variant="body1">
                Intensidade de cada estilo de liderança em sua personalidade.
              </Typography>

              {leadershipStyles.map((style, idx) => (
                <Typography key={idx} variant="body2">
                  Soma {quizes[idx].titulo}: {style} ({results[idx]})
                </Typography>
              ))}

              {results.every((score) => score <= 33) && (
                <Typography color="secondary">
                  Seu estilo de liderança é misto.
                </Typography>
              )}

              <Typography variant="body1" sx={{ pt: 2 }}>
                Fonte de pesquisa: Extraído do livro Gente de resultados,
                escrito por Eduardo Ferraz
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Copyright sx={{ pt: 2 }} />
        </Box>
      </Box>
    </Container>
  );
}
