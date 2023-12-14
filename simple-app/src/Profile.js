function ProfileCard(props) {
    const { title, handle, image } = props;
    return (
    <div>
        <img src={image} alt={title} />
        <div>{title}</div>
        <div>{handle}</div>
    </div>);
}

export default ProfileCard;