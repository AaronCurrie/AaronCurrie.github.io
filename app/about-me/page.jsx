import styles from './page.module.css'

export default function AboutMe() {
    return (
        <main className="main-offset">
            <section className={styles.section}>
                <img/>
                <h1>About me</h1>
                <h2>Highlights</h2>
                <p>Quick Summary</p>
            </section>
            <section className={styles.section}>
                <h2>Experience</h2>
                <div>
                    <h3>Title</h3>
                    <p>Company</p>
                    <p>Dates</p>
                    <div>
                        <p>Responsibilities</p>
                        <ul>
                            <li>Responsibility 1</li>
                            <li>Responsibility 2</li>
                            <li>Responsibility 3</li>
                        </ul>
                    </div>
                </div>
            </section> 
            <section className={styles.section}>
                <h2>Education</h2>
                <div>
                    <h3>Degree</h3>
                    <p>Institution</p>
                    <p>Dates</p>
                    <div>
                        <p>Highlights</p>
                        <ul>
                            <li>Highlight 1</li>
                            <li>Highlight 2</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <h2>Skills</h2>
                <ul>
                    <li>Skill 1</li>
                    <li>Skill 2</li>
                    <li>Skill 3</li>
                </ul>
            </section>
                   
        </main>
    );
}