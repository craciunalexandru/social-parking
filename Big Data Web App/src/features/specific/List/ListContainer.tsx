import * as React from 'react';
import { connect } from 'react-redux';
import { setActiveEvent } from 'src/redux/modules/rootReducer';
import List from './List';

interface StoreProps {
    events: ParkingEvent[];
    setActiveEvent: (event: ParkingEvent) => any;
}

type ListContainerProps = StoreProps;

class ListContainer extends React.Component<ListContainerProps> {
    render() {
        return(
            <List 
                events={this.props.events} 
                onListItemClick={this.onListItemClick}
            />
        );
    }

    private onListItemClick = (event: ParkingEvent) => () => {
        this.props.setActiveEvent(event);
    }
}

const mapStateToProps = (state: State) => ({
    events: state.events
});

const mapDispatchToProps = (dispatch) => ({
    setActiveEvent: (event: ParkingEvent) => dispatch(setActiveEvent(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);