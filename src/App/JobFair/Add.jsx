import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MdWest } from "react-icons/md";
import translation from "../../translation.json";
import useLang from "../../hooks/useLang";
import Input from "../../components/Input";
import config from "../../config";
import Currency from "../../components/Currency";
import Select from "../../components/Select";
import cities from "../../assets/cities.json";
import Industries from "../../Industries";

const VacancyAdd = () => {
    const [lang, setLang] = useLang();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [industry, setIndustry] = useState('');
    const [website, setWebsite] = useState('https://');
    const [salary, setSalary] = useState(0);
    const [location, setLocation] = useState(null);
    const [expiry, setExpiry] = useState(new Date());
    const [canSubmit, setCanSubmit] = useState(false);

    const submit = e => {
        e.preventDefault();
    }

    return (
        <>
            <Header />
            <Sidebar active={'job-fair'} />
            <div className="absolute top-16 right-0 w-9/12 mobile:w-full py-12 pe-8 mobile:p-8 flex flex-col">
                <div className="flex items-center gap-4">
                    <div className="cursor-pointer" onClick={() => navigate(-1)}>
                        <MdWest />
                    </div>
                    <div className="text-slate-700 font-bold text-xl">{translation.general.add[lang]} {translation.job_match.job_vacancy[lang]}</div>
                </div>
                <form onSubmit={submit} className="flex flex-row gap-8 mt-8">
                    <div className="w-6/12 flex flex-col gap-4">
                        <Input label={translation.profile.position[lang]} value={title} onInput={e => setTitle(e.currentTarget.value)} required />
                        <Input label={translation.general.description[lang]} value={description} onInput={e => setDescription(e.currentTarget.value)} required multiline />
                    </div>
                    <div className="flex flex-col gap-8 grow">
                        <div className="flex items-center gap-4">
                            <div className="text-xs text-slate-500 flex grow">{translation.job_match.work_type[lang]}</div>
                            <div className="border px-3">
                                <select className="w-full outline-0 h-12">
                                    {config.job_types.map((ty, t) => (
                                        <option key={t} value={ty}>{ty}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-xs text-slate-500 flex grow">{translation.job_match.salary[lang]}</div>
                            <Input label="" value={Currency(salary).encode()} onInput={e => {
                                let val = Currency(e.currentTarget.value).decode();
                                if (isNaN(val)) {
                                    val = 0;
                                }
                                setSalary(val);
                            }} />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-xs text-slate-500 flex grow">{translation.general.location[lang]}</div>
                            <Select 
                                options={cities} 
                                id="id"
                                label={"title"}
                                selectedVal={location}
                                handleChange={(val) => setLocation(val)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default VacancyAdd