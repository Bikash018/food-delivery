import SocialProfileClass from "./SocialProfileClass"
const ProfileUserClass = (props) =>{

  console.log(props);
  const {name,html_url ,avatar_url , bio} = props.data;
  return (
    <div className="profile-user-card">
      <a href={html_url} target="_blank" rel='noopener noreferrer'>
        <img 
          className="profile-user-img"
          src={avatar_url}
          alt={name}
          title={name}
        />
      </a>
      <p className="profile-user-bio">{bio}</p>
      <SocialProfileClass/>
    </div>
  )
} 
export default ProfileUserClass