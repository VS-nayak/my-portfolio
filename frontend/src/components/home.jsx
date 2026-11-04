
import './home.css';
import profile from '../assets/profile.jpg';

function Home() {
  return (
    <section className="home" id="home">

      <div className="home-container">

        <div className="home-content">
          <h3>Hello, I'm</h3>

          <h1>N. Venkat Sai Nayak</h1>

          <h2>Aspiring Full Stack Developer</h2>

          <p>
            I am a passionate developer interested in building
            modern and responsive web applications using
            React, Node.js, Express.js and MongoDB.
          </p>

          <a href="#projects" className="btn">
            View My Projects
          </a>
        </div>

        <div className="home-image">
          <img src={profile} alt="Venkat Sai Nayak" />
        </div>

      </div>

    </section>
  );
}

export default Home;
