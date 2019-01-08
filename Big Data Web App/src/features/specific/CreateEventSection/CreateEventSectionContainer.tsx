import * as _ from 'lodash';
import * as React from 'react';
import CreateEventSection from './CreateEventSection';
import { connect } from 'react-redux';
import { setActiveEventDescription, setActiveEventType, setActiveEventPhoto } from 'src/redux/modules/rootReducer';
import { submitEvent } from 'src/requests/events';

interface StoreProps {
    events: ParkingEvent[];
    setActiveEventDescription: (description: string) => any;
    setActiveEventType: (isFree: boolean) => any;
    setActiveEventPhoto: (photo: any) => any;
    submitEvent: (parkingEvent: ParkingEvent) => any;
}

type CreateEventSectionContainerProps = StoreProps;

class CreateEventSectionContainer extends React.Component<CreateEventSectionContainerProps> {
    render() {
        const activeEvent = _.find(this.props.events, (event: ParkingEvent) => event.isActive);

        return (
            <CreateEventSection
                activeEvent={activeEvent} 
                updateDescription={this.props.setActiveEventDescription}
                updateFree={this.props.setActiveEventType}
                updatePhoto={this.props.setActiveEventPhoto}
                submitEvent={this.submitEvent} 
            />
        );
    }

    private submitEvent = (parkingEvent: ParkingEvent) => () => {
        this.props.submitEvent(parkingEvent);
    }
}

const mapStateToProps = (state: State) => ({
    events: state.events
});

const mapDispatchToProps = (dispatch) => ({
    setActiveEventDescription: (description: string) => dispatch(setActiveEventDescription(description)),
    setActiveEventType: (isFree: boolean) => dispatch(setActiveEventType(isFree)),
    setActiveEventPhoto: (photo: any) => dispatch(setActiveEventPhoto(photo)),
    submitEvent: (parkingEvent: ParkingEvent) => dispatch(submitEvent(parkingEvent))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventSectionContainer);