const ProjectsSection = ({projects}) => {
    return (
        <div>
            {projects.map((project, index) => {
                return (
                    <div key={index+project.name}>
                        <h2>{project.name}</h2>
                        <em>{project.tech}</em>
                        <p>{project.concept}</p>
                        <p>{project.description}</p>
                    </div>
                )
            })}
            Placeholder
        </div>
    )
}

export default ProjectsSection;