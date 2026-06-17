import React from 'react';
import styles from './briefing.module.css';
import Button from '../button/button';
import { ModalContent, ModalOverlay } from '../modals/modals';

const Briefing = ({handleClick, briefing, children, sections = []}) => {
    if (!briefing) {
        return <div className={styles.briefingButton}><Button label={'Briefing'} action={handleClick}/></div>
    }
    const [active, setActive] = React.useState(sections[0].title || '');
    return (
        <ModalOverlay closeModal={handleClick} className={styles.briefingOverlay}>
            <ModalContent closeModal={handleClick} height="60vh" className={styles.briefing}>
                <div className={styles.briefingHeader}>
                    <img src='/profilepic.png' alt="Profile" className={styles.profilePic} />
                    <div className={styles.tabs}>
                        {sections.map((section) => {
                            if(!section.title) {
                                return null;
                            }
                            return (
                                <button
                                    key={section.title}
                                    className={`${styles.tab} ${active === section.title ? styles.tabActive : ''}`}
                                    onClick={() => setActive(section.title)}
                                >
                                {section.title}
                            </button>
                        )
                    })}
                    </div>
                </div>
                <div className={styles.briefingContent}>
                    {sections.map((section) => {
                        return <div className={`${active === section.title ? styles.sectionContent : 'display-none'}`} key={section.title}>{section.content}</div>;
                    })}
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Briefing;