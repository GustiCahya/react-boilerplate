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
  Paper,
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
  const initialFormValues = { title: "", details: "", category: "todos" };
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [formErrors, setFormErrors] = React.useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0){
      const result = await dispatch(addNote(formValues));
      if(result.status === 201) {
        history.push("/");
      }
    }
  };
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.details) {
      errors.details = "Details is required!";
    } else if (false) {
      // another validation
    }
    if (!values.category) {
      errors.category = "Category is required!";
    }
    return errors;
  };
  return (
    <Container>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
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
            name="title"
            label="Note Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            value={formValues.title}
            error={formErrors.title}
            helperText={formErrors.title}
            onChange={handleChange}
          />
          <TextField
            sx={styles.field}
            name="details"
            label="Details"
            variant="outlined"
            color="secondary"
            fullWidth
            multiline
            rows={4}
            required
            value={formValues.details}
            error={formErrors.details}
            helperText={formErrors.details}
            onChange={handleChange}
          />
          <FormGroup sx={styles.field}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              name="category"
              value={formValues.category}
              error={formErrors.category}
              helperText={formErrors.category}
              onChange={handleChange}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel
                value="work"
                control={<Radio />}
                label="Works"
              />
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
