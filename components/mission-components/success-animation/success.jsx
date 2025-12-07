'use client'
import React, { useEffect } from 'react';
import styles from './success.module.css';
import { ModalOverlay } from '@/components/modals/modals';
import Button from '@/components/button/button';
import { useUserContext } from '@/context/user';

const Success = ({page}) => {
    const {updatePageStatus} = useUserContext()
    useEffect(() => {
        updatePageStatus(page, true, true)
    }, [])
    return (
        <ModalOverlay>
            <div className={styles.content}>
                <h1>Mission Complete!</h1>
                <Button label='Proceed to Page' type='a' href={`/game${page}`}/>
            </div>
        </ModalOverlay>

    );
};

export default Success;