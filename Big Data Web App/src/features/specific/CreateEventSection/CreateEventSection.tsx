import * as React from 'react';
import ImageUploader from 'react-images-upload';
import { CreateEventSectionWrapper, StyledButton } from './style';
import { Text } from './style';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface CreateEventSectionProps {
    activeEvent?: ParkingEvent;
    updateDescription: (description: string) => any;
    updateFree: (isFree: boolean) => any;
    updatePhoto: (photo: any) => any;
    submitEvent: (parkingEvent: ParkingEvent) => () => void;
}

enum EventType {
    free = "free",
    occupied = "occupied"
};

const CreateEventSection = (props: CreateEventSectionProps) => {
    const isEditEnabled = props.activeEvent && props.activeEvent.isNew;

    return (
        <CreateEventSectionWrapper>
            <div>
                <Text 
                    label={"Descriere"} 
                    multiline={true}
                    disabled={!isEditEnabled}
                    value={props.activeEvent && props.activeEvent.description}
                    onChange={(event) => props.updateDescription(event.target.value)}
                />
            </div>

            <br /><br />
            
            <div>
                <RadioGroup
                    aria-label="Gender"
                    name="Tip parcare"
                    value={props.activeEvent && props.activeEvent.isFree ? EventType.free : EventType.occupied}
                    onChange={(event) => props.updateFree((event.target as any).value === EventType.free)}
                >
                    <FormControlLabel 
                        value={EventType.free} 
                        control={<Radio />}
                        disabled={!isEditEnabled} 
                        label={"Loc de parcare liber"} 
                    />
                    <FormControlLabel 
                        value={EventType.occupied} 
                        control={<Radio />} 
                        disabled={!isEditEnabled} 
                        label={"Loc de parcare ocupat ilegal"} 
                    />
                </RadioGroup>
            </div>
            
            <br /><br />
            
            {isEditEnabled &&
                <div>
                    <ImageUploader
                        withIcon={true}
                        singleImage={true}
                        buttonText={"Selectati imagine"}
                        imgExtension={[".jpg", "png", "jpeg"]}
                        onChange={(event) => props.updatePhoto(event)} 
                    />
                </div>
            }

            <div>
                <StyledButton 
                    variant="contained" 
                    color="primary"
                    disabled={!isEditEnabled}
                    onClick={props.activeEvent && props.submitEvent(props.activeEvent)}
                >
                    Adaugati eveniment
                </StyledButton>
            </div>
        </CreateEventSectionWrapper>
    );
}

export default CreateEventSection;