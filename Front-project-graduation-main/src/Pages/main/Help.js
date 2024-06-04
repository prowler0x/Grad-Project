import './Help.css'
export default function Help() {
    return (<>
       
       <section className='help-section'> 
       <h1>How to Use <span>Extra-Time</span></h1>
        <h2>Getting Started</h2>
        <ol>
            <li>Visit the homepage to get an overview of our services.</li>
            <li>Click on the "Sign Up" button to create an account if you don't have one.</li>
            <li>If you already have an account, click on "Log In" to access your stadium.</li>
        </ol>

        <h2>Updating Your Profile</h2>
        <ol>
            <li>Once logged in, go to the "Update Profile" page.</li>
            <li>Fill in the required information, including your username, email, and any other details.</li>
            <li>Upload a new profile image if needed.</li>
            <li>Set a new password if desired.</li>
            <li>Click the "Update Profile" button to save your changes.</li>
        </ol>

        <h2>Exploring Features</h2>
        <ol>
            <li>Discover our various features by navigating through the menu.</li>
            <li>Read our FAQs on the "Help" page for any specific questions.</li>
        </ol>

        <h2>Contacting Support</h2>
        <p>If you encounter any issues or have questions:</p>
        <ol>
            <li>Visit the "Help and Support" page.</li>
            <li>Use the provided contact details to reach out to our support team.</li>
        </ol>
    </section>
        </>
        )
}