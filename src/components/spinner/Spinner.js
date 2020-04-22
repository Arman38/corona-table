import React from 'react'
import Loader from 'react-loader-spinner'
import classes from './Spinner.module.css'

export const Spinner = () => {
    return(
        <div className={classes.Spinner}>
            <Loader
            type="Puff"
            color="teal"
            height={150}
            width={150}
            />
        </div>
    )
}


