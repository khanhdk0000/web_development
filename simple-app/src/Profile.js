function ProfileCard(props) {
    const { title, handle } = props;
    return (
    <div>
        <div>{title}</div>
        <div>{handle}</div>
    </div>);
}

export default ProfileCard;