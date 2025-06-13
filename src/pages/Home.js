import '../App.css';

/**
 * Home
 * @author Peter Rutschmann
 * @author CJ
 */
const Home = () => {
    return (
        <>
            <div class="about-wrapper">
                <div class="about-title">
                    <h1>Speichern Sie Ihre Daten sicher ab.</h1>
                </div>

                <form>
                    <p>In dieser Applikation können Sie, nachdem Sie sich registriert haben, Ihre sensitiven Daten verschlüsselt
                        in einer Datenbank speichern.</p>
                    <p>Erstellen Sie ein neues Secret. Wählen Sie zwischen:<br></br> -> Credentials<br></br> -> Credit-Cards<br></br>-> Notes.</p>
                </form>
            </div>

        </>
    );
};

export default Home;