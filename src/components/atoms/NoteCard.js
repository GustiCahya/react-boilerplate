import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Typography, Avatar } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../store/notes/actions';
import { blue, green, pink, yellow } from '@mui/material/colors';

export default function NoteCard({note}) {
  const dispatch = useDispatch();
  return (
    <Card elevation={1}>
        <CardHeader
            avatar={
                <Avatar sx={{
                    backgroundColor: () => {
                        if(note.category === 'work') {
                            return yellow[700];
                        }
                        if(note.category === 'money') {
                            return green[500];
                        }
                        if(note.category === 'todos') {
                            return pink[500];
                        }
                        return blue[500];
                    }
                }}>
                    {note.category[0].toUpperCase()}
                </Avatar>
            }
            action={
                <IconButton onClick={() => dispatch(deleteNote(note))}>
                    <DeleteOutlined />
                </IconButton>
            }
            title={note.title}
            subheader={note.category}
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary">
                {note.details}
            </Typography>
        </CardContent>
    </Card>
  )
}
