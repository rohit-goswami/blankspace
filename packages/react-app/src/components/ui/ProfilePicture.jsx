import React from 'react';

// Material UI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfilePicture = ({ address, width, cursor, onClick }) => {
    return (
        <AccountCircleIcon
            style={{
                fontSize: width || 32,
                marginRight: '1rem',
                cursor: cursor || 'default'
            }}
            onClick={onClick}
        />
    );
}
 
export default ProfilePicture;