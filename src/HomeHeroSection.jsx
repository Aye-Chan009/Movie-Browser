import './App.css';

const HomeHero = () => {
    return (
        <div className="bg-dark">
        <div className="container p-0">
            <div className="backdropContainer bg-dark text-white pt-3 pb-3 m-0 px-3" style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '20rem',
            textAlign: 'center',
            }}>
             <h1 className="text" style={{ margin: '0', fontSize: '2rem' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt illo, perspiciatis vel ab blanditiis neque aut. Dolorum praesentium incidunt ex voluptate doloremque odio odit error, nam alias quasi vitae! Esse.
             </h1>
            </div>
        </div>
        </div>
    );
}

export default HomeHero;