import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const VisView = (props) => {
	const { children, hide, style } = props;
	if(hide) {
		return null;
	}
	return(
		<View {...this.props} style={style}>
			{ children }
		</View>
	);
};

VisView.propTypes = {
	children: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
			PropTypes.number,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.element,
				])),
		]).isRequired,
	style: View.propTypes.style,
	hide: PropTypes.bool
};

export default VisView;