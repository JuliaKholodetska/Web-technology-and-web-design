import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/chat';

const MessageForm = ({ chatId, addMessage }) => {
  const [text, setText] = useState('');

  return (
    <div className='chat-form'>
      <div className='bg-primary p'>
        <h3>Leave a message</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addMessage(chatId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired
};

export default connect(
  null,
  { addMessage }
)(MessageForm);
