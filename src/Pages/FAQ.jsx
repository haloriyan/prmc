import React from "react";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import FAQ from "../Partials/FAQ";

const Faq = () => {
    return (
        <>
            <Header />
            <div className="absolute top-20 left-0 right-0">
                <section className="p-20 mobile:p-8 flex flex-col items-center">
                    <img src="/images/faq-img.svg" alt="faq image" className="h-64 mb-8" />
                    <h2 className="text-4xl font-black text-slate-700">Frequently Asked Questions</h2>
                    <div className="text-slate-500 mt-6 mb-16">Some questions that might be obstruct your mind</div>

                    <FAQ />
                </section>

                <Footer />
            </div>
        </>
    )
}

export default Faq;