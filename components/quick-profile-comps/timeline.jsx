const Timeline = ({experience}) => {
    return (
        <div>
            {experience.map((item, index) => {
                return (
                    <div key={index+item.title}>
                        <h2>{item.title}</h2>
                        <p>{item.description.company}</p>
                        <p>{item.description.position}</p>
                        <p>{item.description.date}</p>
                        <p>{item.description.time}</p>
                        <p>{item.description.bio}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Timeline;