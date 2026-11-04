function Projects() {

  const projects = [
    {
      title: "AI Learning Twin",
      description:
        "An AI-based learning platform that creates personalized career roadmaps and learning plans.",
      tech: "React, Node.js, Express, MongoDB",
      github: "https://github.com/yourusername"
    },

    {
      title: "Personal Portfolio",
      description:
        "A responsive personal portfolio website to showcase my skills, education and projects.",
      tech: "React, CSS, JavaScript",
      github: "https://github.com/yourusername"
    }
  ];

  return (
    <section className="projects" id="projects">

      <h1 className="section-title">My Projects</h1>

      <div className="projects-container">

        {projects.map((project, index) => (

          <div className="project-card" key={index}>

            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <h4>Technologies:</h4>

            <span>{project.tech}</span>

            <br /><br />

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-btn"
            >
              GitHub
            </a>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Projects;