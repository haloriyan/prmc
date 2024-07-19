import React, { useEffect, useState } from "react";
import translation from "../../translation.json";
import axios from "axios";
import config from "../../config";
import moment from "moment";
import { BiCalendar, BiEdit, BiPlus, BiTrash, BiX } from "react-icons/bi";
import Popup from "../../components/Popup";
import Input from "../../components/Input";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";

const inputStyles = Input({exportStyles: true});
const InputContainer = ({children}) => {
    return (
        <div className={inputStyles.styles.Wrapper}>
            <div className={inputStyles.styles.Area}>
                {children}
            </div>
            {inputStyles.bottomLine}
        </div>
    )
}

const EducationSettings = ({user, lang}) => {
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);

    const [educations, setEducations] = useState([]);
    const [education, setEducation] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    
    const [name, setName] = useState('');
    const [level, setLevel] = useState('SMA');
    const [major, setMajor] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [description, setDescription] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [addButton, setAddButton] = useState(translation.general.add[lang]);
    const [delButton, setDelButton] = useState(translation.general.delete[lang]);
    const [editButton, setEditButton] = useState(translation.general.save_changes[lang]);

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null) {
            setTriggerLoading(false);
            axios.post(`${config.baseUrl}/api/education`, {
                token: user.token,
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setEducations(res.educations);
            })
        }
    }, [isLoading, triggerLoading, user]);

    useEffect(() => {
        let isCan = name !== "" && description !== "" && major !== "" && startDate !== null && endDate !== null;
        setCanSubmit(isCan);
        setCanUpdate(isCan);
    }, [name, description, major, startDate, endDate])

    const refreshData = () => {
        setLoading(true);
        setTriggerLoading(true);
        setName('');
        setDescription('');
        setStartDate(new Date());
        setEndDate(new Date());
    }

    const submit = (e) => {
        e.preventDefault();
        if (canSubmit) {
            setCanSubmit(false);
            setAddButton(translation.general.adding[lang]);
            axios.post(`${config.baseUrl}/api/education/store`, {
                token: user.token,
                name,description,major,level,
                start_date: moment(startDate).format('Y-M-D'),
                end_date: moment(endDate).format('Y-M-D'),
            })
            .then(response => {
                refreshData();
                setAdding(false);
                setAddButton(translation.general.add[lang]);
            })
            .catch(e => {
                setAddButton(translation.general.add[lang]);
            })
        }
    }
    const update = e => {
        e.preventDefault();
        if (canUpdate) {
            setCanUpdate(false);
            setEditButton(translation.general.save_changes_process[lang]);
            axios.post(`${config.baseUrl}/api/education/update`, {
                token: user.token,
                id: education.id,
                name,description,major,level,
                start_date: moment(startDate).format('Y-M-D'),
                end_date: moment(endDate).format('Y-M-D'),
            })
            .then(response => {
                refreshData();
                setEditing(false);
                setEditButton(translation.general.save_changes[lang]);
            })
            .catch(e => {
                setEditButton(translation.general.save_changes[lang]);
            })
        }
    }

    const del = () => {
        setDelButton(translation.general.deleting[lang]);
        axios.post(`${config.baseUrl}/api/education/delete`, {
            id: education.id,
        })
        .then(response =>{ 
            let res = response.data;
            refreshData();
            setDeleting(false);
            setDelButton(translation.general.delete[lang]);
        })
    }
    const placeholderBoxes = [1,1,1,1,1,1,1,1];

    return (
        <>
            <h2 className="text-2xl font-bold text-slate-700 mb-8">{translation.profile.education[lang]}</h2>
            {
                isLoading ?
                <div className="flex flex-wrap gap-4">
                    {
                        placeholderBoxes.map((bx, b) => (
                            <div key={b} className="flex flex-col gap-2 grow basis-52 border p-4 rounded-lg aspect-video">
                                <div className="h-6 bg-slate-200 w-11/12"></div>
                                <div className="h-4 bg-slate-200 w-8/12"></div>
                                <div className="h-2 bg-slate-200 w-3/12"></div>
                                <div className="h-2 bg-slate-200 w-5/12"></div>
                            </div>
                        ))
                    }
                </div>
                :
                <div className="flex flex-wrap gap-4">
                    {
                        educations.map((edu, e) => (
                            <div key={e} className="flex flex-col gap-2 grow basis-52 max-w-md border p-4 rounded-lg relative">
                                <div className="text-xl font-bold text-slate-700">{edu.institute_name}</div>
                                <div className="text-sm text-slate-700 mb-4">{edu.major}</div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <BiCalendar />
                                    <div className="text-sm text-slate-500">{moment(edu.start_date).format('DD MMM Y')} - {moment(edu.end_date).format('DD MMM Y')}</div>
                                </div>

                                <div className="absolute top-5 right-5 flex gap-4 items-center">
                                    <button className="bg-green-500 text-white text-xs h-8 aspect-square rounded flex items-center justify-center cursor-pointer" onClick={() => {
                                        setEducation(edu);
                                        setEditing(true);
                                        setName(edu.institute_name);
                                        setMajor(edu.major);
                                        setDescription(edu.description);
                                        setStartDate(edu.start_date);
                                        setEndDate(edu.end_date);
                                    }}>
                                        <BiEdit />
                                    </button>
                                    <button className="bg-red-500 text-white text-xs h-8 aspect-square rounded flex items-center justify-center cursor-pointer" onClick={() => {
                                        setDeleting(true);
                                        setEducation(edu);
                                    }}>
                                        <BiTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            <button className="h-14 aspect-square rounded-full fixed bottom-10 right-10 bg-primary flex items-center justify-center text-white" onClick={() => setAdding(true)}>
                <BiPlus />
            </button>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-x flex grow">{translation.education.add_new[lang]}</div>
                        <div className="h-12 aspect-square rounded-full border text-slate-700 hover:text-primary flex items-center justify-center cursor-pointer" onClick={() => setAdding(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="flex items-center gap-4">
                            <div className="flex grow text-slate-500 text-sm">{translation.education.level[lang]}</div>
                            <select className="border-2 p-2 px-3 rounded cursor-pointer" required onChange={e => {
                                setLevel(e.currentTarget.value)
                            }}>
                                <option value="">{translation.compose.choose[lang]}</option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                            </select>
                        </div>
                        <Input label={translation.education.institution_name[lang]} value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <Input label={translation.education.major[lang]} value={major} onInput={e => setMajor(e.currentTarget.value)} required />
                        <Input label={translation.general.description[lang]} value={description} onInput={e => setDescription(e.currentTarget.value)} required multiline />
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col grow gap-2">
                                <div className="text-slate-400 text-xs">{translation.general.start_date[lang]}</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        onChange={(a, b) => {
                                            setStartDate(b);
                                        }}
                                        options={{
                                            enableTime: false,
                                            dateFormat: 'Y-m-d',
                                            time_24hr: true,
                                        }}
                                    />
                                </InputContainer>
                            </div>
                            <div className="flex flex-col grow gap-2">
                                <div className="text-slate-400 text-xs">{translation.general.end_date[lang]}</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        onChange={(a, b) => {
                                            setEndDate(b);
                                        }}
                                        options={{
                                            enableTime: false,
                                            dateFormat: 'Y-m-d',
                                            minDate: startDate
                                        }}
                                    />
                                </InputContainer>
                            </div>
                        </div>
                        <button className={`w-full bg-primary text-white h-12 ${canSubmit ? '' : 'opacity-50'}`}>
                            {addButton}
                        </button>
                    </form>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-xl flex grow">{translation.general.delete[lang]}</div>
                        <div className="h-12 aspect-square rounded-full border text-slate-700 hover:text-primary flex items-center justify-center cursor-pointer" onClick={() => setDeleting(false)}>
                            <BiX />
                        </div>
                    </div>
                    <div className="text-slate-500">{translation.general.delete_confirmation[lang]}</div>
                    <div className="flex items-center justify-end mt-4 pt-4 border-t">
                        <button onClick={del} className="bg-red-500 hover:bg-red-600 text-white text-sm p-2 px-4">{delButton}</button>
                    </div>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <div className="flex items-center gap-4">
                        <div className="text-slate-700 font-bold text-xl flex grow">{translation.general.edit[lang]} {translation.profile.education[lang]}</div>
                        <div className="h-12 aspect-square rounded-full border text-slate-700 hover:text-primary flex items-center justify-center cursor-pointer" onClick={() => setEditing(false)}>
                            <BiX />
                        </div>
                    </div>
                    <form onSubmit={update}>
                        <div className="flex items-center gap-4">
                            <div className="flex grow text-slate-500 text-sm">{translation.education.level[lang]}</div>
                            <select className="border-2 p-2 px-3 rounded cursor-pointer" defaultValue={level} required onChange={e => {
                                setLevel(e.currentTarget.value)
                            }}>
                                <option value="">{translation.compose.choose[lang]}</option>
                                <option value="SD">SD</option>
                                <option value="SMP">SMP</option>
                                <option value="SMA">SMA</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                            </select>
                        </div>
                        <Input label={translation.education.institution_name[lang]} value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <Input label={translation.education.major[lang]} value={major} onInput={e => setMajor(e.currentTarget.value)} required />
                        <Input label={translation.general.description[lang]} value={description} onInput={e => setDescription(e.currentTarget.value)} required multiline />
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col grow gap-2">
                                <div className="text-slate-400 text-xs">{translation.general.start_date[lang]}</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        value={startDate}
                                        onChange={(a, b) => {
                                            setStartDate(b);
                                        }}
                                        options={{
                                            enableTime: false,
                                            dateFormat: 'Y-m-d',
                                            time_24hr: true,
                                        }}
                                    />
                                </InputContainer>
                            </div>
                            <div className="flex flex-col grow gap-2">
                                <div className="text-slate-400 text-xs">{translation.general.end_date[lang]}</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        value={endDate}
                                        onChange={(a, b) => {
                                            setEndDate(b);
                                        }}
                                        options={{
                                            enableTime: false,
                                            dateFormat: 'Y-m-d',
                                            // minDate: startDate
                                        }}
                                    />
                                </InputContainer>
                            </div>
                        </div>
                        <button className={`w-full bg-primary text-white h-12 ${canSubmit ? '' : 'opacity-50'}`}>
                            {editButton}
                        </button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default EducationSettings