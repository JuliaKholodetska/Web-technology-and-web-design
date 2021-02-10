import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatItem from './ChatItem';
import ChatForm from './ChatForm';
import { getChats } from '../../actions/chat';

const Chats = ({ getChats, Chat: { chats } }) => {
  useEffect(() => {
    getChats();
  }, [getChats]);

  return (
    <Fragment>
      <h1 className="large text-primary">Chats</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <ChatForm />
      <div className="chats">
        {chats.map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
      </div>
    </Fragment>
  );
};

Chats.propTypes = {
  getChats: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  chat: state.chat
});

export default connect(mapStateToProps, { getChats })(Chats);
