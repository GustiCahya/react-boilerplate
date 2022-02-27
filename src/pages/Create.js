import React from "react";
import {
  Button,
  Typography,
  Container,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormGroup,
  Paper
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notes/actions";

const styles = {
  field: {
    my: 2,
    display: "block",
  },
};

export default function Create() {
  // route
  const history = useHistory();
  // store
  const dispatch = useDispatch();
  // states
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [details, setDetails] = React.useState("");
  const [detailsError, setDetailsError] = React.useState(false);
  const [category, setCategory] = React.useState("todos");
  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      setTitleError(false);
      setDetailsError(false);
      if (title === "") {
        setTitleError(true);
      }
      if (details === "") {
        setDetailsError(true);
      }
      if (title && details) {
        const body = {
          title,
          details,
          category,
        };
        const result = await dispatch(addNote(body));
        if(result.status === 201) {
          history.push("/");
        }
      }
    },
    [title, details, category, history, dispatch]
  );
  return (
    <Container>
      <Paper sx={{p: 2, borderRadius: 2}}>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Create a new note
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            sx={styles.field}
            label="Note Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            error={titleError}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={styles.field}
            label="Details"
            variant="outlined"
            color="secondary"
            fullWidth
            multiline
            rows={4}
            required
            error={detailsError}
            onChange={(e) => setDetails(e.target.value)}
          />
          <FormGroup sx={styles.field}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel value="money" control={<Radio />} label="Money" />
              <FormControlLabel value="todos" control={<Radio />} label="Todos" />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel value="work" control={<Radio />} label="Works" />
            </RadioGroup>
          </FormGroup>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
