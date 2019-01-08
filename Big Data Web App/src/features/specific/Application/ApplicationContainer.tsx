import * as React from 'react';
import { connect } from 'react-redux';
import { requestEvents } from 'src/requests/events';
import Application from './Application';

interface StoreProps {
    requestEvents: () => any;
}

type ApplicationContainerProps = StoreProps;

class ApplicationContainer extends React.Component<ApplicationContainerProps> {
    componentDidMount() {
        this.props.requestEvents();
    }

    render() {
        return(
            <Application />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestEvents: () => dispatch(requestEvents())
});

export default connect(null, mapDispatchToProps)(ApplicationContainer);