import React from 'react';
import styles from './password-text.module.css';

    const PasswordDecryptor = ({input, hackClick}) => {
        if( input.includes('-issues') ) {
            return (
                <div>
                    <br></br>
                    <p>Password encryption leak.... displaying current password encryption.</p>
                    <p>83-110-111-119-98-111-97-114-100-105-110-103-51-54</p>
                    <p>
                        {'S482@!#%9^&*1$7*0(3)6_+4=8-2!5@n7#9^0&*1$3(6)8_+5=4-7!2@9o#1^0&*8$6(3w)5_+7=b2-9!4@1#8^5&o*0$3(7)2_+6=9-1!8@4#0^7&*2$a5(9)3_+1=6-8!0@5#2^9r&*4$1(7)6_+3d=8-5!2@7#4^1&i*9$0(8)5_n+2=7-3!6@9g#8^2&*5$4(1)7_+0age=36-9!8@2#5^7&*1$6(4)3_+9>>'}<button onClick={hackClick} className={styles.hiddenButton}>click!!M£</button>{'<<=0-2!7@1#6^4&*8$5(2)9_+3=7-0!5@8#3^2&*7$1(4)6_+9=5-8!3@0#7^1&*2$9(5)4_+6=8-7!'}
                    </p>
                    <p></p>
                </div>
            )}
        if(input.includes('-help')) {
            return (<div>
                <br></br>
                <p>This terminal has security vulnerabilities, please review issues</p>
                <br></br>
                    <p>Commands:</p>
                    <p>--prompt: show current password prompt</p>
                    <p>--age: show password age</p>
                    <p>--previous: show previous password</p>
                    <p>--last-prompt: show the prompt for the previous password</p>
                    <p>--required: show password requirements</p>
                    <p>--issues: show security issues</p>
                </div>)
        }
        if (input.includes('-last-prompt')) {
            return <p><br></br>Previous Prompt: previous country lived and age?</p>;
        }
        if (input.includes('-previous')) {
            return <p><br></br>Previous Password: Australia34</p>;
        }
        if (input.includes('-prompt')) {
            return <p><br></br>Prompt: favourite hobby and age?</p>;
        }
        if (input.includes('-age')) {
            return <p><br></br>Age: current password age 2 years</p>;
        }

        if (input.includes('-required')) {
            return <p><br></br>Requirements: 6 characters min, 1 uppercase min, 1 number min</p>;
        }
        if (typeof input === 'string') {
            input = input.split('');
        }
        return (
            <p>
                <br></br>
                {input.map((text, index) => {
                    const getColor = (input, index) => {
                        const password = 'Snowboarding36';
                        if (index < password.length) {
                            return input[index] === password[index] ? 'green' : 'red';
                        }
                        return 'red';
                    };
                    return <span key={index} style={{ color: getColor(input, index) }}>{text}</span>;
                })}
            </p>
        )
    }

export default PasswordDecryptor;