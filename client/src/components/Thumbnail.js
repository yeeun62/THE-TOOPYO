function Thumbnail({ list }) {
    return (
        <div>
            <h1>{list.title}</h1>
            <img className="picture_1" src={list.picture_1}></img>
            <img className="picture_2" src={list.picture_2}></img>
            <div className="descript">{list.description}</div>
        </div>
    );
}

export default Thumbnail;
