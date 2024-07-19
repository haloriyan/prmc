import React, { useEffect, useState } from "react";
import translation from "../../translation.json";
import axios from "axios";
import config from "../../config";
import Industries from "../../Industries";
import Popup from "../../components/Popup";
import { BiPlus, BiX } from "react-icons/bi";
import Input from "../../components/Input";

const SkillSettings = ({lang, user, setMessage}) => {
    const [localUser, setLocalUser] = useState(user);
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState(null);

    const [name, setName] = useState('');
    const [level, setLevel] = useState(null);
    const [industry, setIndustry] = useState(localUser.industry);
    const [canUpdate, setCanUpdate] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    
    const [isAdding, setAdding] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [editButton, setEditButton] = useState(translation.general.save_changes[lang]);
    const [addButton, setAddButton] = useState(translation.general.add[lang]);
    const [delButton, setDelButton] = useState(translation.general.delete[lang]);

    useEffect(() => {
        let isCan = name !== "" && level !== "";
        setCanUpdate(isCan);
        setCanSubmit(isCan);
    }, [name, level]);

    useEffect(() => {
        if (user !== null && isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/skill`, {
                token: user.token,
            })
            .then(response => {
                setLoading(false);
                let res = response.data;
                setSkills(res.skills);
            })
        }
    }, [user, isLoading, triggerLoading]);

    const levelPlacehodler = [1,1,1];

    const submit = e => {
        e.preventDefault();
        setAddButton(translation.general.adding[lang]);
        axios.post(`${config.baseUrl}/api/skill/store`, {
            name, level, industry,
            token: localUser.token,
        })
        .then(response => {
            let res = response.data;
            setLoading(true);
            setTriggerLoading(true);
            setAdding(false);
            setLevel(0);
            setName('');
            setAddButton(translation.general.add[lang]);
            console.log(res);
            setLocalUser(res.user);
            setMessage({
                status: 200,
                body: translation.general.save_changes_success[lang],
            });
        })
        .catch(e => {
            setAddButton(translation.general.add[lang]);
            setMessage({
                status: 500,
                body: translation.general.save_changes_failed[lang]
            });
        })
    }
    const update = (e) => {
        e.preventDefault();
        if (canUpdate) {
            setEditButton(translation.general.save_changes_process[lang]);
            axios.post(`${config.baseUrl}/api/skill/update`, {
                id: skills[0].id,
                name, level, industry,
            })
            .then(response => {
                let res = response.data;
                setLoading(true);
                setTriggerLoading(true);
                setEditing(false);
                setLevel(0);
                setName('');
                setEditButton(translation.general.save_changes[lang]);
                setLocalUser(res.user);
                setMessage({
                    status: 200,
                    body: translation.general.save_changes_success[lang],
                });
            })
            .catch(e => {
                setEditButton(translation.general.save_changes[lang]);
                setMessage({
                    status: 500,
                    body: translation.general.save_changes_failed[lang]
                });
            })
        }
    }

    const del = e => {
        e.preventDefault();
        setDelButton(translation.general.deleting[lang]);
        axios.post(`${config.baseUrl}/api/skill/delete`, {
            token: localUser.token,
            id: skills[0].id,
        })
        .then(response => {
            setDeleting(false);
            setTriggerLoading(true);
            setLoading(true);
            setDelButton(translation.general.delete[lang]);
        })
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-700 mb-6">{translation.profile.skills[lang]}</h2>
            {
                isLoading ?
                <div className="w-full border p-4 rounded-lg flex items-center gap-4">
                    <div className="h-20 aspect-square rounded-full bg-slate-200"></div>
                    <div className="flex flex-col gap-2 grow">
                        <div className="h-6 bg-slate-200 w-4/12"></div>
                        <div className="h-4 bg-slate-200 w-2/12"></div>
                    </div>
                </div>
                :
                <>
                {
                    skills.length === 0 ?
                    <div className="text-slate-700">{translation.general.no_data[lang]}</div>
                    :
                    <div className="w-full border p-4 rounded-lg flex items-center gap-4">
                        {
                            Industries.map((ind, i) => {
                                if (ind.name === localUser.industry) {
                                    return (
                                        <img src={ind.image} alt={ind.name} className="h-20 aspect-square" />
                                    )
                                }
                            })
                        }
                        <div className="flex flex-col gap-2 grow">
                            <div className="text-lg font-bold text-slate-700">{skills[0].name} - {user.industry}</div>
                            <div className="text-slate-500">{translation.skill_levels[lang][skills[0].level]}</div>
                        </div>
                        <div className="text-primary cursor-pointer font-bold" onClick={() => {
                            setName(skills[0].name);
                            setLevel(skills[0].level);
                            setEditing(true);
                        }}>{translation.general.edit[lang]}</div>
                        <button className="bg-red-500 text-white p-2 px-4" onClick={() => setDeleting(true)}>
                            {translation.general.delete[lang]}
                        </button>
                    </div>
                }
                </>
            }

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-xl flex grow">{translation.general.add[lang]} {translation.profile.skills[lang]}</div>
                        <div className="h-12 aspect-square rounded-full border text-slate-700 hover:text-primary flex items-center justify-center cursor-pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <Input label={translation.certificate.title[lang]} value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <div className="text-xs text-slate-500">Level</div>
                        <div className="flex items-center gap-4 p-2 bg-slate-100 rounded-lg">
                            {
                                levelPlacehodler.map((lv, l) => (
                                    <div className={`flex grow items-center justify-center cursor-pointer p-2 rounded-lg ${level === l ? 'bg-white shadow-lg text-primary' : 'text-slate-700'}`} key={l} onClick={() => setLevel(l)}>{translation.skill_levels[lang][l]}</div>
                                ))
                            }
                        </div>

                        <div className="text-xs text-slate-500">{translation.job_match.industry_sector[lang]}</div>
                        <div className="flex gap-2 items-center flex-wrap">
                            {
                                Industries.map((ind, i) => (
                                    <div key={i} className={`border rounded p-2 px-4 text-sm cursor-pointer flex items-center gap-2 ${ind.name === industry ? 'text-primary border-primary' : ''}`} onClick={() => setIndustry(ind.name)}>
                                        <img src={ind.image} alt={ind.name} className="h-6 aspect-square rounded-full object-cover" />
                                        {ind.name}
                                    </div>
                                ))
                            }
                        </div>

                        <button className={`w-full bg-primary text-white h-12 ${canSubmit ? '' : 'opacity-50'}`}>
                            {addButton}
                        </button>
                    </form>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-xl flex grow">{translation.general.edit[lang]} {translation.profile.skills[lang]}</div>
                        <div className="h-12 aspect-square rounded-full border text-slate-700 hover:text-primary flex items-center justify-center cursor-pointer" onClick={() => setEditing(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form onSubmit={update}>
                        <Input label={translation.certificate.title[lang]} value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <div className="text-xs text-slate-500">Level</div>
                        <div className="flex items-center gap-4 p-2 bg-slate-100 rounded-lg">
                            {
                                levelPlacehodler.map((lv, l) => (
                                    <div className={`flex grow items-center justify-center cursor-pointer p-2 rounded-lg ${level === l ? 'bg-white shadow-lg text-primary' : 'text-slate-700'}`} key={l} onClick={() => setLevel(l)}>{translation.skill_levels[lang][l]}</div>
                                ))
                            }
                        </div>
                        
                        <div className="text-xs text-slate-500">{translation.job_match.industry_sector[lang]}</div>
                        <div className="flex gap-2 items-center flex-wrap">
                            {
                                Industries.map((ind, i) => (
                                    <div key={i} className={`border rounded p-2 px-4 text-sm cursor-pointer flex items-center gap-2 ${ind.name === industry ? 'text-primary border-primary' : ''}`} onClick={() => setIndustry(ind.name)}>
                                        <img src={ind.image} alt={ind.name} className="h-6 aspect-square rounded-full object-cover" />
                                        {ind.name}
                                    </div>
                                ))
                            }
                        </div>

                        <button className={`w-full bg-primary text-white h-12 ${canUpdate ? '' : 'opacity-50'}`}>
                            {editButton}
                        </button>
                    </form>
                </Popup>
            }
            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-xl flex grow">{translation.general.delete[lang]} {translation.profile.skills[lang]}</div>
                        <div className="h-12 aspect-square rounded-full border text-slate-700 hover:text-primary flex items-center justify-center cursor-pointer" onClick={() => setDeleting(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form>
                        <div>{translation.general.delete_confirmation[lang]}</div>
                        <div className="flex items-center justify-end gap-4 border-t pt-4 mt-4">
                            <div className="cursor-pointer p-2 px-4 text-slate-500" onClick={() => setDeleting(false)}>{translation.general.cancel[lang]}</div>
                            <div className="cursor-pointer p-2 px-4 text-white bg-red-500" onClick={del}>{delButton}</div>
                        </div>
                    </form>
                </Popup>
            }

            {
                (skills.length === 0 && !isLoading) &&
                <button className="h-14 aspect-square rounded-full fixed bottom-10 right-10 bg-primary flex items-center justify-center text-white" onClick={() => setAdding(true)}>
                    <BiPlus />
                </button>
            }
        </>
    )
}

export default SkillSettings