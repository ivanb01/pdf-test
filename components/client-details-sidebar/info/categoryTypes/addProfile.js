import Overlay from 'components/shared/overlay';
import Radio from 'components/shared/radio';
import { useState } from 'react';
import StatusSelect from 'components/status-select';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts'


const AddProfile = ({ handleClose, contactId, categoryTypes, statuses, handleFetchProfilesRequired}) => {

    const [selectedContactType, setSelectedContactType] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [loadingButton, setLoadingButton] = useState(false);


    const addProfile = async () => {
        try {
            const newProfile = {
                "category_id": selectedContactType,
                "status_id": selectedStatus
             }
            const {data} = await contactServices.addContactProfile(contactId, newProfile);
            console.log('add profile', newProfile, data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert('Not implemented yet')
        await addProfile();
        handleFetchProfilesRequired();
        handleClose();
    }

    return (
        <Overlay title="Add Aditional Type" handleCloseOverlay={handleClose} className="w-[40%]">
                 <div className="p-5 pt-0">           
                    <div className="flex flex-col my-2">                     
                    <div>
                        <Radio
                        options={categoryTypes}
                        label="What kind of contact is this for you?"
                        selectedContactType={selectedContactType}
                        changeContactType={setSelectedContactType}
                        className="mb-6"
                        />
                        <StatusSelect
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        label="In what stage of communication?"
                        statuses={statuses}
                        />
                    </div>
                    
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row justify-between mt-5">
                                <Button
                                    size="small"
                                    className="mr-3 "
                                    white
                                    label="Cancel"
                                    onClick={handleClose}
                                />
                                <Button 
                                    type="submit"
                                    size="small" 
                                    primary 
                                    label="Save Changes" 
                                    loading={loadingButton}
                                    onClick={()=>{
                                        setLoadingButton(true);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Overlay>
    )
}

export default AddProfile