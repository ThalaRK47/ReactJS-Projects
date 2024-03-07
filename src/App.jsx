import PropTypes from "prop-types";

const userData =[
  {
    name:"Jackie Chan",
    country:"China",
    description:"Associate Software Engineer | Java Developer",
    skills:["HTML","CSS","JavaScript","Core JAVA","Spring Boot","SQL"],
    net:true,
    profile:"images/1.jpg",
  },
  {
    name:"Kendall Jenner",
    country:"USA",
    description:"UI/UX Designer | Front-End Developer",
    skills:["UI/UX","HTML","CSS","JavaScript","React js"],
    net:false,
    profile:"images/2.jpg",
  },
  {
    name:"Guan Xiaotong",
    country:"China",
    description:"UI/UX Designer | Front-End Developer",
    skills:["UI/UX","HTML","CSS","Tailwind CSS","BootStrap","JavaScript","React js","Ember Js"],
    net:true,
    profile:"images/3.jpg",
  },
  {
    name:"Tobie Maguire",
    country:"Londan",
    description:"Web Developer | Associate Software Engineer | Back-End Developer",
    skills:["UI/UX","Figma","Illustrator","HTML","CSS","TailwindCSS","JavaScript","React Js","Node Js","Ember Js","Next Js","Express Js","SQL","MangoDB"],
    net:true,
    profile:"images/4.jpg",
  },
  {
    name:"Hailee",
    country:"Londan",
    description:"Web Developer | Front-End Developer",
    skills:["UI/UX","Figma","Illustrator","HTML","CSS","TailwindCSS","JavaScript","React Js","Ember Js","Next Js","Express Js"],
    net:false,
    profile:"images/5.jpg",
  }
];

function User(props){
    return (
      <>
        <div className="card-container">
          <span className={props.net?"pro online":"pro offline"}>{props.net?"online":"offline"}</span>
          <img src={props.profile} className="img" alt="Loading" />
          <h3>{props.name}</h3>
          <h3>{props.country}</h3>
          <p>{props.description}</p>
          <div className="buttons">
            <button className="primary">Following</button>
            <button className="primary outline">Message</button>
          </div>
          <div className="skills">
            <h6>Skills</h6>
            <ul>
              {props.skills.map((skill,index)=>(
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
}

const App = () => {
  return (
      <>
        {userData.map((user,index)=>(
          <User key={index} name={user.name} country={user.country} description={user.description} net={user.net} profile={user.profile}  skills={user.skills} />
        ))}
      </>
  );
}

export default App


{/* <User name="Jackie Chan" country="China" description="Java Developer | UI/UX Designer" skills={["UI/UX","HTML","CSS","JavaScript","React js","Node js","Ember js"]} net={true} profile="images/5.jpg" /> */}

User.propTypes = {
  name:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired,
  skills:PropTypes.arrayOf(PropTypes.string).isRequired,
  profile:PropTypes.string.isRequired,
};