import React, { useState } from "react";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import Jumbo from "../components/Jumbo";
import Button from "../components/Button";
import Input from "../components/Input";

const DeleteAccount = () => {
    const [done, setDone] = useState(false);
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    
    const submit = (e) => {
        // axios.post(`${config.baseUrl}/api/user/request-deletion`, {
        //     email, reason
        // })
        // .then(response => {
        //     let res = response.data;
        //     setDone(true);
        // })
        setDone(true);
        e.preventDefault();
    }

    return (
        <>
            <Header />
            <div className="absolute top-20 left-0 right-0">
                <Jumbo
                    withNavigation={true} breadcrumb={'Delete Account'}
                    background="/shipping.jpg"
                    title={
                        <>
                            <div>Account Deletion</div>
                        </>
                    }
                />

                {
                    done ?
                    <section className="mobile:p-8 p-20">
                        <div>Your account deletion request has been received. We will assist in deleting your account within a maximum of 1 x 24 hours.</div>
                    </section>
                    :
                    <section className="mobile:p-8 p-20">
                        <div className="text-center">Please fill out the following form to submit an account deletion request.</div>
                        <form action="#" onSubmit={submit}>
                            <Input label="Account Email :" placeholder={'Email address used for your account'} onInput={e => setEmail(e.currentTarget.value)} />
                            <Input label="Reason for Deletion :" placeholder={'Please tell us why you want to delete your Promociin account'} onInput={e => setReason(e.currentTarget.value)} />
                            <Button>Submit Request</Button>
                        </form>
                    </section>
                }

                <Footer /> 
            </div>
        </>
    )
}

export default DeleteAccount
