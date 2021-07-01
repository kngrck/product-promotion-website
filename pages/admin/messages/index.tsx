import { GetServerSideProps } from "next";
import styled from "styled-components";
import { isAuthenticated } from "../../../lib/auth";
import { Typography, CircularProgress, setRef } from "@material-ui/core";
import { deleteMessage, getAllMessages } from "../../../lib/messages-util";
import { Message } from "../../../models/Message";
import MessageList from "../../../components/admin/messages/message-list";
import MessageDetails from "../../../components/admin/messages/message-details";
import { useEffect, useState } from "react";

function MessagePage(props: { messages: Message[]; error: any }) {
  const [messages, setMessages] = useState<Message[]>(props.messages);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({
    id: -1,
    senderFullName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderMessage: "",
  });

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages: Message[] = await getAllMessages();
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, [refresh]);

  const onDeleteMessage = async (messageId: number) => {
    setLoading(true);
    try {
      await deleteMessage(messageId);
      setRefresh(!refresh);
      alert("Silindi.");
      closeMessageDetails();
    } catch (error) {
      alert("Hata silinemedi.");
    }
    setLoading(false);
  };

  const openMessageDetails = () => {
    setOpen(true);
  };

  const closeMessageDetails = () => {
    setOpen(false);
  };

  const chooseMessage = (message: Message) => {
    setMessage(message);
    openMessageDetails();
  };
  return (
    <Container>
      <Typography variant="h4">Mesajlar</Typography>

      <>
        <MessageDetails
          message={message}
          open={open}
          onClose={closeMessageDetails}
        />
        <MessageList
          messageClick={chooseMessage}
          messages={messages}
          deleteMessageClick={onDeleteMessage}
        />
      </>

      <div />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!(await isAuthenticated(context.req))) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  try {
    const fetchedMessages: Message[] = await getAllMessages();
    return {
      props: {
        messages: fetchedMessages,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        messages: null,
        error: error,
      },
    };
  }
};

export default MessagePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: space-evenly;
  height: 100%;

  overflow: hidden;
`;
