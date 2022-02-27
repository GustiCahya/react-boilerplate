import React from "react";
import { Container, Box } from "@mui/material";
import NoteCard from "../components/atoms/NoteCard";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../store/notes/actions";
import Masonry from "react-masonry-css";

export default function Notes() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <Box key={note.id}>
            <NoteCard note={note} />
          </Box>
        ))}
      </Masonry>
    </Container>
  );
}
