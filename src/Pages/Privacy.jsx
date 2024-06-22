import React from "react";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import { Link } from "react-router-dom";

const Privacy = () => {
    return (
        <>
            <Header />
            <div className="absolute top-20 left-0 right-0">
                <section className="p-20 mobile:p-8">
                    <h2 className="text-center text-4xl font-black text-slate-700">Privacy Policy</h2>
                    <div className="text-center text-slate-500 mt-6">Your data and privacy are very important to us</div>

                    <div className="mt-12 leading-7">
                        This privacy policy explains how Promociin ("we") collect, use, and share users' personal information ("you") when using Promociin ("Application"). We are committed to protecting your privacy and handling your personal information carefully.
                    </div>

                    <h3 className="mt-12 font-bold text-slate-700">1. Information We Collect</h3>
                    <div className="mt-6 leading-7">
                        We may collect the following information when you use the Application:
                    </div>
                    <div className="mt-6 leading-7">
                        <span className="font-bold">Information You Provide Directly</span> : This includes information you provide when registering an account, filling out forms, or interacting with the features of the Application. Examples include name, email address, phone number, and other information you choose to provide.
                    </div>
                    <div className="mt-6 leading-7">
                        <span className="font-bold">Information Collected Automatically</span> : When you use the Application, we may collect certain information automatically, including:
                    </div>
                    <ul className="mt-6 leading-7 pl-8">
                        <li className="list-disc">
                            <span className="font-bold">Usage Data</span> : Information about how you use the Application, such as features you access, time and duration of use, and your interactions with the Application's content.
                        </li>
                        <li className="list-disc">
                            <span className="font-bold">Device Data</span> : Information about the device you use to access the Application, such as device model, operating system, unique device identifiers, IP address, and mobile network information.
                        </li>
                    </ul>

                    <h3 className="mt-12 font-bold text-slate-700">2. Use of Information</h3>
                    <div className="mt-6 leading-7">
                        We use the information we collect for the following purposes:
                    </div>
                    <ul className="mt-6 leading-7 pl-8">
                        <li className="list-disc">
                            <span className="font-bold">Providing, Maintaining, and Improving the Application</span> : This includes using information to operate the Application, provide features and functionality, fix bugs and technical issues, and enhance performance and user experience.
                        </li>
                        <li className="list-disc">
                            <span className="font-bold">Personalizing Experience</span> : We may use information to personalize your experience in the Application, such as displaying content relevant to your interests.
                        </li>
                        <li className="list-disc">
                            <span className="font-bold">Communication</span> : We may use information to communicate with you, such as sending notifications, updates, or other important information related to the Application.
                        </li>
                        <li className="list-disc">
                            <span className="font-bold">Analysis and Research</span> : We may use information to analyze usage trends, understand how users interact with the Application, and conduct research to improve our products and services.
                        </li>
                    </ul>

                    <h3 className="mt-12 font-bold text-slate-700">3. Sharing of Information</h3>
                    <div className="mt-6 leading-7">
                        We may share your personal information in the following situations:
                    </div>
                    <ul className="mt-6 leading-7 pl-8">
                        <li className="list-disc">
                            <span className="font-bold">With Service Providers</span> : We may share information with third-party service providers who help us operate, maintain, and improve the Application. These service providers are bound by confidentiality agreements and are only allowed to use information for the purposes we specify.
                        </li>
                        <li className="list-disc">
                            <span className="font-bold">For Legal Compliance</span> : We may share information if required by law, regulation, legal process, or legitimate government request.
                        </li>
                        <li className="list-disc">
                            <span className="font-bold">In Business Transactions</span> : If we are involved in a merger, acquisition, or sale of assets, your personal information may be transferred as part of that transaction. We will notify you of any changes in ownership or use of your personal information.
                        </li>
                    </ul>

                    <h3 className="mt-12 font-bold text-slate-700">4. Information Security</h3>
                    <div className="mt-6 leading-7">
                        We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of electronic transmission or storage is 100% secure, so we cannot guarantee absolute security of your information.
                    </div>

                    <h3 className="mt-12 font-bold text-slate-700">5. Data Retention & Deletion</h3>
                    <div className="mt-6 leading-7">
                        We will retain your personal information as long as necessary for the purposes described in this privacy policy, unless a longer retention period is required or permitted by law. If you wish to delete your account or request deletion of your personal information, please visit the <Link className="text-primary underline" to={'/delete-account'}>Account Deletion Page</Link>
                    </div>

                    <h3 className="mt-12 font-bold text-slate-700">6. Changes to Privacy Policy</h3>
                    <div className="mt-6 leading-7">
                        We may update this privacy policy as needed. If we make material changes, we will notify you through the Application or by other appropriate means.
                    </div>

                    <h3 className="mt-12 font-bold text-slate-700">7. Contact Information</h3>
                    <div className="mt-6 leading-7">
                        If you have any questions or concerns about this privacy policy or the Promociin application, please <Link to={'/contact'} className="underline text-primary">Contact Us</Link>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}

export default Privacy
