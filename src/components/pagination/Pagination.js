import React from 'react'
import {Pagination} from 'react-bootstrap'
import classes from './Pagination.module.css'

export const Paginationn = ({quantity,clicked,activePage}) => {
    
    const pItem = []
    for(let i = 0;i< quantity;i++){
        pItem.push(i+1)
    }

    return (
        <Pagination size={"sm"} className = {classes.Pagination}>
            {pItem.map(idx => {
                return <Pagination.Item 
                            active = {idx === activePage}
                            key = {idx}
                            onClick = {() => clicked(idx)}
                 >{idx}</Pagination.Item>
            })}
        </Pagination>
    )
}