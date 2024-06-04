import './Contact.css'
export default function Contact() {
    return (<>
       
    <section className='contact'>
    <h1>Contact Us</h1>
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you. Please fill out the form below, and we'll get back to you as soon as possible.</p>

        <form action="submit_form.php" method="post">
            <label for="name" >Your Name:</label>
            <input type="text" id="name" name="name" required/>

            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" required/>

            <label for="message">Your Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit">Submit</button>
        </form>
    </section>
        </>
        )
}