import React from 'react'

const ErrorCard = ({type}) => {
    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: '500',
            }
        }>No Games Found in {type} </div>
    )
}
export default ErrorCard
