import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './IntlContext';
import formatMessage from './utils/formatMessage';

const propTypes = {
  defaultLocale: PropTypes.string.isRequired,
  messageMap: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  messageMap: {},
};

class MultiIntlProvider extends Component {
  constructor(props) {
    super(props);

    const { defaultLocale, messageMap } = props;
    const messages = messageMap[defaultLocale];

    this.state = {
      value: {
        locale: defaultLocale,
        messages,
        formatMessage: (config, variables) => formatMessage(config, messages, variables),
        updateLocale: this.updateLocale,
      },
    };
  }

  updateLocale = (locale) => {
    const messages = this.props.messageMap[locale];
    this.setState({
      value: {
        ...this.state.value,
        locale,
        messages,
        formatMessage: (config, variables) => formatMessage(config, messages, variables),
      },
    });
  }

  render() {
    return (
      <Provider value={this.state.value}>
        {this.props.children}
      </Provider>
    );
  }
}

MultiIntlProvider.propTypes = propTypes;
MultiIntlProvider.defaultProps = defaultProps;
export default MultiIntlProvider;
