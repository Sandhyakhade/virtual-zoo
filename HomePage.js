import image from "./image3.jpg";
function HomePage() {
    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h2>Welcome to the Virtual Zoo!</h2>
            <img
                src={image} // Replace this with a valid image URL
                alt="Zoo"
                style={{
                    width: "80%" ,borderRadius: "10px"
                }}
            />
        </div>
    );
}

export default HomePage;
