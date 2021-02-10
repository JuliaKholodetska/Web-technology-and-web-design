import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ChatItem from '../chats/ChatItem';
import MessageForm from './MessageForm';
import MessageItem from '../chat/MessageItem';
import { addChat, getChat } from '../../actions/chat';

const Chat = ({ getChat, chat: { chat, loading }, match }) => {
  useEffect(() => {
    getChat(match.params.id);
  }, [getChat, match.params.id]);

  return loading || chat === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/chats" className="btn">
        Back To Chats
      </Link>
      <ChatItem chat={chat} showActions={false} />
      <MessageForm chatId={chat._id} />
      <div className="messages">
        {chat.messages.map((message) => (
          <MessageItem key={message._id} message={message} chatId={chat._id} />
        ))}
      </div>
    </Fragment>
  );
};

Chat.propTypes = {
  getChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  chat: state.chat
});

export default connect(mapStateToProps, { getChat })(Chat);
