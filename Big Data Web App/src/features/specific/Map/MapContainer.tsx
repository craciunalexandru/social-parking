import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import * as _ from 'lodash';
import * as React from 'react';
import * as cuid from 'cuid';
import { connect } from 'react-redux';
import { googleKey } from 'src/config/config';
import { setActiveEvent, setActiveEventAndAddIt } from 'src/redux/modules/rootReducer';
import { MapWrapper, NegativeText, PositiveText, TitleWrapper } from './style';

interface MapContainerState {
    currentMarker: any;
}

interface StoreProps {
    events: ParkingEvent[];
    setActiveEvent: (event: ParkingEvent) => any;
    setActiveEventAndAddIt: (event: ParkingEvent) => any;
}

interface ComponentProps {
    google: any;
}

type MapContainerProps = ComponentProps & StoreProps;

class MapContainer extends React.Component<MapContainerProps, MapContainerState> {
    render() {
        const markers = _.map(this.props.events, (event: ParkingEvent) => (
            <Marker
                key={event.id}
                onClick={this.onMarkerClick}
                title={event.description}
                icon={{
                    scaledSize: new google.maps.Size(70, 70),
                    url: event.isFree
                        ? "https://www.freeiconspng.com/uploads/directions--cophall-parking-gatwick-22.png"
                        : "https://cdn3.iconfinder.com/data/icons/taxi-service/50/47-512.png"
                }}
                position={{
                    lat: event.lat,
                    lng: event.long
                }} 
            />
        ));

        const activeEvent = _.find(this.props.events, (event: ParkingEvent) => event.isActive);

        return(
            <MapWrapper>
                <Map
                    google={this.props.google}
                    zoom={13}
                    initialCenter={{
                        lat: 44.439663,
                        lng: 26.096306
                    }}
                    onClick={this.onMapClick}
                    centerAroundCurrentLocation={true}
                >
                    {markers}
                    
                    {this.state && this.state.currentMarker && activeEvent && 
                        <InfoWindow
                            map={{} as any}
                            google={this.props.google}
                            marker={this.state.currentMarker as google.maps.Marker}
                            visible={true}
                        >
                            <React.Fragment>
                                <TitleWrapper>
                                    <h1>{activeEvent.description}</h1>
                                    <h3>{activeEvent.isFree 
                                            ? <PositiveText>Loc de parcare liber</PositiveText>
                                            : <NegativeText>Loc de parcare ocupat ilegal</NegativeText>
                                        }
                                    </h3>
                                    <span>Raportat la {activeEvent.reportedAt}</span>
                                </TitleWrapper>

                                {activeEvent.photo && 
                                    <img
                                        src={activeEvent.photo}
                                        width={500}
                                        height={400} 
                                    />
                                }
                            </React.Fragment>
                        </InfoWindow>
                    }
                </Map>
            </MapWrapper>
        );
    }

    private onMarkerClick = (props, marker) => {
        /** Store the active event by the pressed marker's title */
        const activeEvent = _.find(this.props.events, (event: ParkingEvent) => event.description === props.title); 
        
        if(activeEvent) {
            this.props.setActiveEvent(activeEvent);
        }

        this.setState({ currentMarker: marker });
    }

    private onMapClick = (props, map, event) => {
        const hasNewEvents = _.find(this.props.events, (parkingEvent: ParkingEvent) => parkingEvent.isNew);
        
        if (!hasNewEvents) {
            const newActiveEvent: ParkingEvent = {
                id: cuid.slug(),
                lat: event.latLng.lat(),
                long: event.latLng.lng(),
                reportedAt: new Date().toDateString(),
                description: "",
                photo: "",
                isFree: false,
                isNew: true,
                isActive: true
            };
    
            this.props.setActiveEventAndAddIt(newActiveEvent);
        }
    }
}

const mapStateToprops = (state: State) => ({
    events: state.events
});

const mapDispatchToProps = (dispatch) => ({
    setActiveEvent: (event: ParkingEvent) => dispatch(setActiveEvent(event)),
    setActiveEventAndAddIt: (event: ParkingEvent) => dispatch(setActiveEventAndAddIt(event))
});

export default GoogleApiWrapper({
    apiKey: googleKey
})(connect(mapStateToprops, mapDispatchToProps)(MapContainer));