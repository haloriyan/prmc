import React, { useState } from "react";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import Screenshot from "../components/Screenshot";
import { BiBriefcase, BiChalkboard, BiHome, BiLogoPlayStore, BiSolidStar, BiStar, BiUser, BiUserCheck, BiVideoRecording } from "react-icons/bi";
import FAQ from "../Partials/FAQ";
import BeatingCircle from "../Partials/BeatingCircle";
import Waves from "../Partials/Waves";
import Dots from "../Partials/Dots";
import config from "../config";
import { MdEast } from "react-icons/md";

const Home = () => {
    const gPlayLink = "https://play.google.com/store/apps/details?id=com.promociin.app";
    const features = [
        {
            icon: <BiVideoRecording size={28} />,
            color: "bg-red-500",
            title: "Record or Stream Your Skills and Activities",
            description: "Showcase your talents and activities through recorded or live-streamed videos. Let's your skills speak for themselves."
        },
        {
            icon: <BiUserCheck size={28} />,
            color: "bg-blue-500",
            title: "Glow up Your Profile and Show Them What You're Worth",
            description: "Push your profile with dynamic content. Demonstrates your true worth and capabilities."
        },
        {
            icon: <BiChalkboard size={28} />,
            color: "bg-green-500",
            title: "Share Your Knowledge with Others Privately",
            description: "Share your expertise privately. Help others learn and grow from your insights."
        },
        {
            icon: <BiBriefcase size={28} />,
            color: "bg-purple-500",
            title: "Manage Interview Schedules",
            description: "Receieve interview invitation from the app."
        }
    ];

    const testimonials = [
        {
            name: "Adelia",
            body: "Very impressed with Promociin's efficiency in helping me find a job. The app's user-friendly interface made the job search process smoother. Thank you Promociin, I found my dream job through this app!",
            photo: "/images/avatar-female.jpg",
            rate: 4,
        },
        {
            name: "Riyan Satria",
            body: "Promociin really brought positive changes to my job search journey. This app not only provides many job options but also simplifies the application process. I highly recommend Promociin to friends who are looking for career opportunities.",
            photo: "/images/avatar-male-2.jpg",
            rate: 4,
        },
        {
            name: "Gede Arya",
            body: "I am very impressed with the advanced job search features in Promociin. This app helped me find a job that matches my skills and interests. The job application process is more efficient and transparent. Thank you Promociin, I am very satisfied with the results!",
            photo: "/images/avatar-male.jpg",
            rate: 5,
        },
    ];
    const totalStars = [1,1,1,1,1];

    return (
        <>
            <Header />
            <div className="absolute top-20 left-0 right-0">
                <div className="flex mobile:flex-col mobile:flex-col-reverse items-center gap-10 p-20 mobile:p-8 relative">
                    <img src="/images/header-shape-1.svg" alt="headshape" className="absolute top-0 right-0 mobile:hidden" />
                    <BeatingCircle pos={window.screen.width < 480 ? {x: 0, y: 0} : {x: 300, y: 121}} color="bg-purple-200" />
                    <BeatingCircle pos={window.screen.width < 480 ? {x: 0, y: 0} : {x: 480, y: 590}} color="bg-blue-200" />
                    <div className="flex flex-col basis-6/12 mobile:basis-12/12 mobile:w-full">
                        <h2 className="mb-4 text-primary">Promociin - Show Your Skill</h2>
                        <h2 className="font-black text-4xl mobile:text-2xl">UPLOAD YOUR SKILLS. SHARE YOUR COMPETENCE.</h2>
                        <div className="mt-8 text-slate-600 text-lg mobile:text-sm mobile:leading-7">
                        Promociin.com is a short-video sharing app to promote your skills and competence, creativity, business, and product value with a new stunning way. The new level of social media. Let your skills speak for themselves on videos.
                        </div>
                        <div className="flex mt-8">
                            <a href={gPlayLink} target="_blank" className="p-4 px-8 rounded bg-primary text-white text-sm font-bold flex items-center gap-4">
                                <BiLogoPlayStore size={24} />
                                DOWNLOAD
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col grow justify-center items-center">
                        <Screenshot src={'/images/HOME.PNG'} />
                    </div>
                </div>
                
                <section className="p-20 mobile:p-8 pt-8 relative" id="features">
                    <img src="/images/footer-shape.svg" alt="headshape" className="absolute top-20 mobile:top-0 left-0" />
                    <img src="/images/hero-area.svg" alt="headshape" className="absolute bottom-0 right-0" />
                    <div className="flex flex-col items-center gap-6">
                        <h3 className="text-4xl mobile:text-2xl font-black text-slate-700 text-center">Here is What You Can Do</h3>
                        <div className="text-slate-500 text-center w-6/12 mobile:w-full">Discover the next level of your dream</div>
                    </div>

                    <div className="flex mobile:flex-col gap-4 mt-12 pb-10">
                        <div className="flex flex-col gap-4 grow">
                            {
                                features.map((feat, f) => (
                                    <div key={f} className="shadow hover:shadow-lg rounded-lg p-8 flex items-center gap-6">
                                        <div className={`h-16 aspect-square rounded-full ${feat.color} text-white flex items-center justify-center`}>
                                            {feat.icon}
                                        </div>
                                        <div className="flex flex-col grow gap-2">
                                            <h4 className="font-bold text-slate-700">{feat.title}</h4>
                                            <div className="text-slate-500 text-sm"> {feat.description}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        
                        <div className="flex flex-col grow justify-center items-center basis-10/12">
                            <Screenshot src={'/images/PROFILE.PNG'} />
                        </div>
                    </div>
                </section>

                <section className="p-20 mobile:p-8 relative">
                    <div className="flex flex-col items-center gap-6" id="screenshots">
                        {
                            window.screen.width > 480 &&
                            <Dots horizontal={3} vertical={20} containerStyle={{
                                position: 'absolute',
                                right: 40, top: 300
                            }} />
                        }
                        <Waves />
                        <h3 className="text-4xl font-black text-slate-700 text-center">App Screenshots</h3>
                        <div className="text-slate-500 text-center w-6/12">Take some Look How it going to Works</div>
                    </div>

                    <div className="w-full mt-6 flex gap-2 items-center justify-center desktop:aspect-video" style={{
                        aspectRatio: window.screen.width < 480 ? 4/3 : 16/9,
                    }}>
                        <img src="/images/FILTER.PNG" alt="HOME SS" className="rounded-xl shadow-lg h-4/5" />
                        <img src="/images/HOME.PNG" alt="HOME SS" className="rounded-xl shadow-lg h-full" />
                        <img src="/images/PROFILE.PNG" alt="PROFILE SS" className="rounded-xl shadow-lg h-4/5" />
                    </div>
                </section>

                <section className="p-20 mobile:p-8" style={{backgroundColor: `${config.primaryColor}20`}}>
                    <div className="flex items-center mb-8">
                        <h2 className="text-4xl font-black flex grow">User Reviews</h2>
                        <a href={gPlayLink} target="_blank" className="flex items-center gap-4 text-sm">
                            See More on Google Play <MdEast />
                        </a>
                    </div>
                    <div className="flex overflow-scroll gap-4 w-full mb-4">
                        {
                            testimonials.map((testi, t) => (
                                <div key={t} className="bg-white p-8 mobile:p-4 rounded-lg" style={{
                                    flex: 1,
                                    minWidth: window.screen.width > 480 ? '45%' : '80%',
                                    flexBasis: window.screen.width > 480 ? '45%' : '80%',
                                }}>
                                    <div className="flex mobile:flex-col gap-4 items-center">
                                        <img src={testi.photo} alt={testi.name} className="h-16 aspect-square rounded-full object-cover" />
                                        <div className="flex flex-col grow gap-2">
                                            <div className="text-slate-700 font-bold">{testi.name}</div>
                                            <div className="flex gap">
                                                {
                                                    totalStars.map((st, s) => (
                                                        <BiSolidStar color={s < testi.rate ? '#fcd840' : '#ddd'} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-slate-600 mt-4 mobile:text-sm">{testi.body}</div>
                                </div>
                            ))
                        }
                    </div>

                    <Waves />
                </section>

                <section className="flex gap-6 p-20 mobile:flex-col mobile:p-8">
                    <div className="flex flex-col basis-5/12">
                        <img src="/images/faq-img.svg" alt="faq image" className="w-7/12 mb-8" />
                        <h3 className="text-4xl font-black text-slate-700">Frequently Asked Questions</h3>
                        <div className="text-slate-500 mt-6 mb-8">Some questions that might be obstruct your mind</div>
                        <Dots vertical={2} horizontal={8} />
                    </div>
                    <FAQ />
                </section>

                <section className="bg-primary p-20 mobile:p-8 text-white relative flex mobile:flex-col items-center gap-4">
                    <div className="flex items-center justify-center grow gap-4">
                        <img src="/images/icon-white.png" alt="icon square" className="rounded-lg object-cover h-96" />
                        {/* <img src="/images/HOME.PNG" alt="home-ss" className="h-96 mobile:h-52 rounded-full mobile:rounded" />
                        <img src="/images/PROFILE.PNG" alt="prof-ss" className="h-96 mobile:h-52 rounded-full mobile:rounded" />
                        <img src="/images/FILTER.PNG" alt="filt-ss" className="h-96 mobile:h-52 rounded-full mobile:rounded" /> */}
                    </div>
                    <div className="flex flex-col basis-6/12 gap-4">
                        <h2 className="text-4xl mobile:text-xl font-black flex grow">Download from Google Play</h2>
                        <div className="flex">
                            <a href={gPlayLink} target="_blank" className="bg-white text-primary p-3 px-6">
                                Download Now
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}

export default Home
