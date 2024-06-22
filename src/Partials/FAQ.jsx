import React, { useState } from "react";
import config from "../config";

const FAQ = () => {
    const [index, setIndex] = useState(0);
    const faqs = [
        {
            question: "How to use Promociin?",
            answer: "You can download Promociin app from Google Play and creates a new account then fills your professional data."
        },
        {
            question: "Is this free?",
            answer: "Absolutely. We are not collecting any fees, all features and services can be accessed for free."
        },
        {
            question: "Will my personal data safe from thieft or attacker?",
            answer: "We did not ask too much your personal data to keep it safe and getting trust from our users. However some personal data we need will be secured with our most advanced security."
        }
    ];

    return (
        <>
            <div className="flex flex-col grow gap-4 basis-6/12">
                {
                    faqs.map((faq, f) => (
                        <div key={f} className={`p-8 rounded-lg border cursor-pointer ${f === index ? 'border-primary' : ''}`} style={{
                            backgroundColor: f === index ? `${config.primaryColor}10` : '#fff'
                        }} onClick={() => setIndex(f)}>
                            <div className="text-xl font-bold text-slate-700">{faq.question}</div>
                            {
                                index === f &&
                                <div className="text-slate-500 mt-4">{faq.answer}</div>
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FAQ