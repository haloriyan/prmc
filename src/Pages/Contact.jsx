import React from "react";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import Jumbo from "../components/Jumbo";
import { Link } from "react-router-dom";
import { BiLogoWhatsapp, BiMap } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import Input from "../components/Input";
import Button from "../components/Button";

const Contact = () => {
    const submit = e => {
        e.preventDefault();
    }

    return (
        <>
            <Header />
            <div className="absolute top-20 left-0 right-0">
                <Jumbo
                    withNavigation={true} breadcrumb={'Contact'}
                    background="/shipping.jpg"
                    title={
                        <>
                            <div>Contact Us</div>
                        </>
                    }
                />
                <section className="p-20 mobile:p-8">
                    <div className="flex gap-4 items-center">
                        <Link to={'https://wa.me/6285236700721'} target="_blank" className="flex flex-col grow gap-4 items-center justify-center text-slate-700">
                            <BiLogoWhatsapp size={42} />
                            <div>Whatsapp</div>
                            <div className="text-primary">+62 852 3670 0721</div>
                        </Link>
                        <Link to={'mailto:promociin.com@gmail.com'} target="_blank" className="flex flex-col grow gap-4 items-center justify-center text-slate-700">
                            <MdEmail size={42} />
                            <div>Email</div>
                            <div className="text-primary">promociin.com@gmail.com</div>
                        </Link>
                        <Link to={'https://maps.app.goo.gl/PboDBPnW5Fope6KQA'} target="_blank" className="flex flex-col grow gap-4 items-center justify-center text-slate-700">
                            <BiMap size={42} />
                            <div>Location</div>
                            <div className="text-primary">Surabaya, Indonesia</div>
                        </Link>
                    </div>

                    <form onSubmit={submit}>
                        <Input label="Name" />
                        <Input label="Email" />
                        <Input label="Message" multiline />
                        <div className="inline">
                            <Button>Send</Button>
                        </div>
                    </form>

                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.857744056239!2d112.73458997511585!3d-7.257026492749663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f942ccdd7ce3%3A0x12072f0108ba519a!2sKoridor%20Coworking%20Space!5e0!3m2!1sen!2sid!4v1706021537913!5m2!1sen!2sid"
                        style={{border: 0}}
                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>

                <Footer />
            </div>
        </>
    )
}

export default Contact;