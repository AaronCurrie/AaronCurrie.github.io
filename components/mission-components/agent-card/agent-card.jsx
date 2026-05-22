import React from 'react';
import styles from './agent-card.module.css';
import Button from '@/components/button/button';
import LoadingScan from '@/components/loading/loading-scan';

const AgentCard = ({ agent, agentName, action, selectedAgent, loading }) => {
console.log(agent, 'agent')
    const classProvider = (agent, trait, answer, selected) => {
        if (!selected) {
            return ''
        } else if (trait === 'interests') {
            return answer.includes(agent) ? styles.correctData : styles.incorrectData;
        } else if (agent[trait] === answer) {
            return styles.correctData;
        } else {
            return styles.incorrectData;
        }
    }
    const isSelected = selectedAgent.includes(agentName);
    return (
        <div className={`${styles.agentCard} ${isSelected && styles.incorrectCard}`}>
            {loading ? <LoadingScan text='Agent Relocating...'/> :  
                    (                        
                    <div className={styles.innerCard}>
                        <img className={styles.image} src={agent.image}/>
                        <div className={styles.cardContent}>
                            <p className={classProvider(agent, 'base', 'Leeds', isSelected)} >Base: {agent.base}</p>
                            <p className={classProvider(agent, 'experience', 2.5, isSelected)}>Experience: {agent.experience} years</p>
                            <p className={classProvider(agent, 'training', 'Bootcamp', isSelected)} >Training: {agent.training}</p>
                            <p className={classProvider(agent, 'certifications', 'Google Cloud Certified', isSelected)}>Certifications: {agent.certifications}</p>
                            <p>Interests: </p>
                            <ul>
                                {agent.interests.map((interest, index) => (
                                    <li className={classProvider(interest, 'interests',['Hiking', 'Snowboarding', 'Mountain Biking'] , isSelected)} key={index}>{interest}</li>
                                ))}
                            </ul>
                        </div>
                       <Button disabled={selectedAgent.includes(agentName)} label='Select Agent' type='button' action={() => action(agentName)}/>
                    </div>
                    )
                }
        </div>
    );
};

export default AgentCard;