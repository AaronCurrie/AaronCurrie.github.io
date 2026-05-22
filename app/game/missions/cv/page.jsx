'use client';
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Typewriter from "@/components/animations/typewriter";
import Success from "@/components/mission-components/success-animation/success";
import Briefing from "@/components/briefing/briefing";
import useScreenSize from "@/hooks/screen-size";
import Button from "@/components/button/button";
import PasswordDecryptor from "@/components/mission-components/password-text/password-text";

const CVMission = () => {
    const [briefing, setBriefing] = useState(true);
    const [inputValue, setInputValue] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [complete, setComplete] = useState(false);
    const [correct, setCorrect] = useState(false);
    const screenRef = useRef(null);

    const { mobile } = useScreenSize()

    useEffect(() => {
        if(!mobile) {
          setBriefing(true);
        }
    }, [mobile])
    

    const handleBriefingClick = () => {
        setBriefing(!briefing);
    }

    const handleSubmit = (inputValue) => {
        if(inputValue === 'clear') {
            setInputValue([]);
            return;
        }
        if (inputValue === 'Snowboarding36') {
            setTimeout(() => {
                setCorrect(true);
            }, 1000);
        }
        setInputValue(prev => [...prev, inputValue]);
    }

    useEffect(() => {
        if (correct) {
            setTimeout(() => {
                setComplete(true);
            }, 3000);
        }
    }, [correct])

    useEffect(() => {
        console.log('Input Value:', inputValue);
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [inputValue]);

    const brokenPassword = () => {
        setInputValue(prev => [...prev, 'error character leak: S***b***d**g*6']);
    }

    return (
        <main className={'briefing-offset '}>
            {complete && <Success page='/cv'></Success>}
            <Briefing handleClick={handleBriefingClick} briefing={briefing}>
            <h3>Mission: Terminal Hack</h3>
            <p>The targets highly classified CV is locked behind a secure terminal. We need you to bypass the security protocols and retrieve the information.</p>
            <p>We must get into the terminal by cracking the agents password, luckily this terminal is an older model and may have vulnerabilities we can exploit.</p>
            <p>Pay attention to the terminal output, it may contain hints about the password.</p>
            </Briefing>
            <div className={styles.screenContainer}>
                <div className={styles.screen} ref={screenRef}>
                    {correct ? (
                        <div>
                            <p>Access Granted</p>
                            <p>Accessing Terminal........</p>
                        </div>
                    ) : (
                        <>
                        <p>Welcome user: AC1107</p>
                        <p>to view command list type --help.</p>
                        <p>Please enter your password to access this terminal.</p>
                        <p>Enter Password:</p>
                        {inputValue.map((text, index) => {
                            return <PasswordDecryptor key={index} input={text} hackClick={brokenPassword} />
                        })}
                        </>
                    )}

                </div>
            </div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    value={currentInput}
                    onChange={e => setCurrentInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSubmit(currentInput);
                            setCurrentInput('');
                        }
                    }}
                />
                <Button
                    label={'Submit'}
                    action={() => {
                        handleSubmit(currentInput);
                        setCurrentInput('');
                    }}
                />
            </div>
        </main>
    );
};

export default CVMission;