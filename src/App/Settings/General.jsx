import React, { useState } from "react";
import translation from "../../translation.json";
import axios from "axios";
import config from "../../config";
import Input from "../../components/Input";
import ReactCountryFlag from "react-country-flag";
import { MdEast } from "react-icons/md";

const GeneralSettings = ({lang, setLang, user, setMessage, setActive}) => {
    const [buttonText, setButtonText] = useState(translation.general.save_changes[lang]);
    const [name, setName] = useState(user.name);
    const [about, setAbout] = useState(user.about);

    const submit = (e) => {
        e.preventDefault();

        setButtonText(translation.general.save_changes_process[lang]);
        axios.post(`${config.baseUrl}/api/user/update-basic`, {
            token: user.token,
            name, about
        })
        .then(response => {
            let res = response.data;
            window.localStorage.setItem('user_data', JSON.stringify(res.user));
            console.log(res);
            setMessage({
                status: 200,
                body: translation.general.save_changes_success[lang],
            })
            setButtonText(translation.general.save_changes[lang]);
        })
        .catch(e => {
            setButtonText(translation.general.save_changes[lang]);
            setMessage({
                status: 500,
                body: translation.general.save_changes_failed[lang],
            })
        })
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-700">{translation.explore.acccounts[lang]}</h2>
            <form onSubmit={submit}>
                <Input label={translation.register.name[lang]} value={name} onInput={e => setName(e.currentTarget.value)} required />
                <Input label="Bio" value={about} onInput={e => setAbout(e.currentTarget.value)} required multiline />
                <div className="flex items-center justify-end">
                    <button className="bg-primary text-white text-sm p-3 px-6">{buttonText}</button>
                </div>
            </form>

            <div className="flex items-center gap-4 mt-8">
                <div className="flex grow">{translation.profile.app_lang[lang]}</div>
                <div className="flex items-center gap-4">
                    <div className={`h-12 aspect-square flex items-center justify-center cursor-pointer ${lang === 'en' ? 'bg-primary' : 'bg-slate-100'}`} onClick={() => {
                        setLang('en')
                    }}>
                        <ReactCountryFlag countryCode="US" />
                    </div>
                    <div className={`h-12 aspect-square flex items-center justify-center cursor-pointer ${lang === 'id' ? 'bg-primary' : 'bg-slate-100'}`} onClick={() => {
                        setLang('id')
                    }}>
                        <ReactCountryFlag countryCode="ID" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <div className="flex flex-col grow">
                    <div className="text-slate-700 font-bold">{translation.profile.block_list[lang]}</div>
                    <div className="text-slate-500 font-bold text-sm">{translation.profile.block_list_description[lang]}</div>
                </div>
                <div className="text-primary text-xl h-12 flex items-center justify-center aspect-square cursor-pointer" onClick={() => setActive('block')}>
                    <MdEast />
                </div>
            </div>
        </>
    )
}

export default GeneralSettings