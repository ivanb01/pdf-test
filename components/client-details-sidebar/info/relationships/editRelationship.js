import { useEffect, useState } from 'react';
import Text from 'components/shared/text';
import Avatar from 'components/shared/avatar';
import Overlay from 'components/shared/overlay';
import Button from 'components/shared/button';
import Dropdown from 'components/shared/dropdown';
import * as contactServices from 'api/contacts'
import { relationshipsTypes } from 'global/variables'


const EditRelationshipModal = ({ handleClose, contactId, relationship, handleFetchRelationships }) => {

    const [relationshipTypeToEdit, setRelationshipTypeToEdit] = useState(relationship.relationship_name);
    const handleRelationshipType = (relationshipType) => {
        setRelationshipTypeToEdit(relationshipType.name);
    }

    const editRelationship = async () => {
        try {
            const relationshipEdit = {
                relationship_name: relationshipTypeToEdit
            };
            const { data } = await contactServices.updateContactRelationship(contactId, relationship.relationship_id, relationshipEdit);
            console.log('edit success', data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('edit relationship', contactId, relationship.relationship_id, relationshipTypeToEdit);
        await editRelationship();
        handleFetchRelationships();
        handleClose();
        
    }


    return (
        <Overlay title="Edit Relationship" handleCloseOverlay={handleClose} className="w-[632px]">
                 <div className="p-5 pt-0">           
                    <div className="flex flex-col my-2">                     
                        <div  className="flex flex-row p-3 bg-gray-50 group">
                            <Avatar
                                size="w-8 h-8"
                                className="mr-4"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            />
                            <div className='flex flex-row justify-between w-[100%]'>
                                <div className="flex flex-col">
                                    <Text className="text-gray6" h4>
                                    { `${relationship.first_name} ${relationship.last_name}`}
                                    </Text>
                                    <Text className="text-gray4" p>
                                        { relationship.email}
                                    </Text>
                                    
                                </div>
                                <div className='flex flex-row items-center'> 
                                    <Dropdown
                                        placeHolder="Choose Type*"
                                        activeIcon={false}
                                        options={relationshipsTypes}
                                        className="mb-1 w-52"
                                        activeClasses='bg-lightBlue1'
                                        handleSelect={(relationshipType)=>handleRelationshipType(relationshipType)}
                                        initialSelect={relationshipTypeToEdit}
                                    ></Dropdown>
                                </div>

                            </div>
                        </div>
                    
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row justify-end mt-5">
                                <Button
                                    size="small"
                                    className="mr-3 "
                                    white
                                    label="Cancel"
                                    onClick={handleClose}
                                />
                                <Button type="submit" size="small" primary label="Save" />
                            </div>
                        </form>
                    </div>
                </div>
            </Overlay>
    )
}

export default EditRelationshipModal