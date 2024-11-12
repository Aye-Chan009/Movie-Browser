const Hero = () => {
    return (
        <div>
            <section
                className="vh-100 d-flex justify-content-center align-items-center bg-dark text-light"
                style={{
                    backgroundImage: "url('https://via.placeholder.com/1500x800')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="text-center">
                    <h1 className="display-4">Welcome to Our Website!</h1>
                    <p className="lead">Explore our amazing content and services. Get started now!</p>
                    <a href="#services" className="btn btn-primary btn-lg">Get Started</a>
                </div>
            </section>
            <div id="services" className="container py-5">
                <h2>Our Services</h2>
                <p>Details about the services you offer.</p>
            </div>
        </div>
    );
}

export default Hero;