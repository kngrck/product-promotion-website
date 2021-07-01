import { Message } from "../../../models/Message";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import styled from "styled-components";
import { useState } from "react";

interface MessageListProps {
  messages: Message[];
  deleteMessageClick: any;
  messageClick: any;
}

function MessageList(props: MessageListProps) {
  const { messages, deleteMessageClick, messageClick } = props;

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [messageId, setMessageId] = useState(-1);

  const openDeleteAlert = () => {
    setDeleteAlert(true);
  };
  const closeDeleteAlert = () => {
    setDeleteAlert(false);
  };
  const applyDelete = () => {
    deleteMessageClick(messageId);
  };
  return (
    <StyledTableContainer>
      <Dialog open={deleteAlert} onClose={closeDeleteAlert}>
        <DialogTitle>Uyarı</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            Mesajı silmek istediğinize emin misiniz ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              applyDelete();
              closeDeleteAlert();
            }}
            color="primary"
          >
            Evet
          </Button>
          <Button onClick={closeDeleteAlert} color="secondary" autoFocus>
            Hayır
          </Button>
        </DialogActions>
      </Dialog>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>
              <Typography variant="h6">Gönderen</Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6">Mail</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Mesaj</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {messages ? (
            messages.map((m, index) => (
              <TableRow key={m.id}>
                <TableCell>
                  <Typography variant="subtitle1">{index + 1}</Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle1">
                    {m.senderFullName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{m.senderEmail}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{m.senderMessage}</Typography>
                </TableCell>

                <TableCell>
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      messageClick(m);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Detay
                  </StyledButton>
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      setMessageId(m.id);
                      openDeleteAlert();
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Sil
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr>
              <td>Loading</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default MessageList;

const StyledTableContainer = styled(TableContainer)`
  &::-webkit-scrollbar {
    width: 10px;
    height: 13px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #3f50b5 14%, #757ce8 64%);
    border-radius: 2px;
    &:hover {
      background: linear-gradient(13deg, #757ce8 14%, #3f50b5 64%);
    }
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 2px;
    box-shadow: inset 7px 10px 12px 0px #f0f0f0;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  margin-right: 10px;
`;
