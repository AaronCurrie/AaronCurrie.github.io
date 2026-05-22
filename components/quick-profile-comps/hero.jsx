import styles from "./hero.module.css";

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1>Welcome to My Portfolio</h1>
                <p>Explore my projects and journey</p>
            </div>
        </div>
    )
}

export default Hero;