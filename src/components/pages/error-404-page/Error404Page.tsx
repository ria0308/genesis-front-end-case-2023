import styles from './Error404Page.module.scss'
import React from "react";

const Error404Page = () =>{
    return(
        <div className={styles['page']}>
            <p>
                404 | Page not found
            </p>
        </div>
    )
}
export default Error404Page;