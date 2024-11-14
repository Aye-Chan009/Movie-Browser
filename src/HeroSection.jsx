const Hero = ({text}) => {
    return (
        <div>
            <section
                className="vh-50 d-flex justify-content-center align-items-center bg-dark text-light"
                style={{
                    backgroundColor: 'black'
                }}
            >
                <div className="text-center">
                    <h1 className="display-4"
                    style={{
                        paddingTop: '80px',
                        paddingBottom: '80px',
                    }}
                    >
                        {text}
                    </h1>
                </div>
            </section>

        </div>
    );
}

export default Hero;