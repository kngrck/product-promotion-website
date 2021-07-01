import { Message } from "../../../models/Message";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
} from "@material-ui/core";

interface MessageDetailsProps {
  message: Message | null | undefined;
  open: any;
  onClose: any;
}

function MessageDetails(props: MessageDetailsProps) {
  const { open, onClose, message } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Mesaj Detayları</DialogTitle>
      <DialogContent>
        <Grid container direction="row" spacing={2}>
          <Grid container item direction="column" xs={6} spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h6">
                İsim
              </Typography>
              <Typography variant="body1">{message?.senderFullName}</Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                Email
              </Typography>
              <Typography variant="body1">{message?.senderEmail}</Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                Telefon
              </Typography>
              <Typography variant="body1">{message?.senderPhone}</Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6">
                Adres
              </Typography>
              <Typography variant="body1">{message?.senderAddress}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography gutterBottom variant="h6">
              Mesaj
            </Typography>
            <Typography variant="body1">{message?.senderMessage}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default MessageDetails;
