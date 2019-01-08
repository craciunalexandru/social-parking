import * as _ from 'lodash';
import * as React from 'react';
import { ListItem, ListItemText, ListWrapper } from './style';

interface ListProps {
    events: ParkingEvent[];
    onListItemClick: (event: ParkingEvent) => () => void;
}

const List = (props: ListProps) => (
    <ListWrapper>
        {_.map(props.events, (event: ParkingEvent) => (
            <ListItem
                key={event.id} 
                onClick={props.onListItemClick(event)}
                isFree={event.isFree}
            >
                <ListItemText>
                    {event.description}
                </ListItemText>
            </ListItem>
        ))}
    </ListWrapper>
);

export default List;